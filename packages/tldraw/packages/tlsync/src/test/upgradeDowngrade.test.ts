import { computed } from '@tldraw/state'
import {
	BaseRecord,
	RecordId,
	SerializedStore,
	Store,
	StoreSchema,
	UnknownRecord,
	createRecordType,
	defineMigrations,
} from '@tldraw/store'
import { TLSyncClient } from '../lib/TLSyncClient'
import { RoomSnapshot, TLRoomSocket } from '../lib/TLSyncRoom'
import { RecordOpType, ValueOpType } from '../lib/diff'
import {
	TLIncompatibilityReason,
	TLSYNC_PROTOCOL_VERSION,
	TLSocketServerSentEvent,
} from '../lib/protocol'
import { TestServer } from './TestServer'
import { TestSocketPair } from './TestSocketPair'

function mockSocket<R extends UnknownRecord>(): TLRoomSocket<R> {
	return {
		isOpen: true,
		sendMessage: jest.fn(),
		close() {
			// noop
		},
	}
}

// @ts-expect-error
global.requestAnimationFrame = (cb: () => any) => {
	cb()
}

const disposables: Array<() => void> = []

afterEach(() => {
	for (const dispose of disposables) {
		dispose()
	}
	disposables.length = 0
})

const UserVersions = {
	ReplaceAgeWithBirthdate: 1,
} as const

interface UserV1 extends BaseRecord<'user', RecordId<UserV1>> {
	name: string
	age: number
}
interface PresenceV1 extends BaseRecord<'presence', RecordId<PresenceV1>> {
	name: string
	age: number
}

const PresenceV1 = createRecordType<PresenceV1>('presence', {
	scope: 'presence',
	validator: { validate: (value) => value as PresenceV1 },
})

const UserV1 = createRecordType<UserV1>('user', {
	scope: 'document',
	migrations: defineMigrations({}),
	validator: { validate: (value) => value as UserV1 },
})

interface UserV2 extends BaseRecord<'user', RecordId<UserV2>> {
	name: string
	birthdate: string | null
}

const UserV2 = createRecordType<UserV2>('user', {
	scope: 'document',
	migrations: defineMigrations({
		currentVersion: UserVersions.ReplaceAgeWithBirthdate,
		migrators: {
			[UserVersions.ReplaceAgeWithBirthdate]: {
				up({ age: _age, ...user }) {
					return {
						...user,
						birthdate: null,
					}
				},
				down({ birthdate: _birthdate, ...user }) {
					return {
						...user,
						age: 0,
					}
				},
			},
		},
	}),
	validator: { validate: (value) => value as UserV2 },
})

type RV1 = UserV1 | PresenceV1
type RV2 = UserV2 | PresenceV1

const schemaV1 = StoreSchema.create<RV1>(
	{ user: UserV1, presence: PresenceV1 },
	{
		snapshotMigrations: defineMigrations({}),
	}
)

const schemaV2 = StoreSchema.create<RV2>(
	{ user: UserV2, presence: PresenceV1 },
	{
		snapshotMigrations: defineMigrations({}),
	}
)

const schemaV3 = StoreSchema.create<RV2>(
	{ user: UserV2, presence: PresenceV1 },
	{
		snapshotMigrations: defineMigrations({
			currentVersion: 1,
			migrators: {
				1: {
					up(store: SerializedStore<UserV2>) {
						// remove any users called joe
						const result = Object.fromEntries(
							Object.entries(store).filter(([_, r]) => r.typeName !== 'user' || r.name !== 'joe')
						)
						// add a user called steve
						const id = UserV2.createId('steve')
						result[id] = UserV2.create({
							id,
							name: 'steve',
							birthdate: '2022-02-02',
						})
						return result
					},
					down(store: SerializedStore<UserV2>) {
						return store
					},
				},
			},
		}),
	}
)

class TestInstance {
	server: TestServer<RV2>
	oldSocketPair: TestSocketPair<RV2>
	newSocketPair: TestSocketPair<RV2>
	oldClient: TLSyncClient<RV1>
	newClient: TLSyncClient<RV2>

	hasLoaded = false

	constructor(snapshot?: RoomSnapshot, oldSchema = schemaV1, newSchema = schemaV2) {
		this.server = new TestServer(newSchema, snapshot)
		this.oldSocketPair = new TestSocketPair('test_upgrade_old', this.server)
		this.newSocketPair = new TestSocketPair('test_upgrade_new', this.server)

		this.oldClient = new TLSyncClient<RV1>({
			store: new Store({ schema: oldSchema, props: {} }),
			socket: this.oldSocketPair.clientSocket as any,
			onLoad: () => {
				this.hasLoaded = true
			},
			onLoadError: (e) => {
				throw new Error('onLoadError', e)
			},
			onSyncError: jest.fn((reason) => {
				throw new Error('onSyncError: ' + reason)
			}),
			presence: computed('', () => null),
		})

		this.newClient = new TLSyncClient<RV2>({
			store: new Store({ schema: newSchema, props: {} }),
			socket: this.newSocketPair.clientSocket,
			onLoad: () => {
				this.hasLoaded = true
			},
			onLoadError: (e) => {
				throw new Error('onLoadError', e)
			},
			onSyncError: jest.fn((reason) => {
				throw new Error('onSyncError: ' + reason)
			}),
			presence: computed('', () => null),
		})

		disposables.push(() => {
			this.oldClient.close()
			this.newClient.close()
		})
	}

	flush() {
		while (this.oldSocketPair.getNeedsFlushing() || this.newSocketPair.getNeedsFlushing()) {
			this.oldSocketPair.flushClientSentEvents()
			this.oldSocketPair.flushServerSentEvents()
			this.newSocketPair.flushClientSentEvents()
			this.newSocketPair.flushServerSentEvents()
		}
	}
}

test('the server can handle receiving v1 stuff from the client', () => {
	const t = new TestInstance()
	t.oldSocketPair.connect()
	t.newSocketPair.connect()

	const user = UserV1.create({ name: 'bob', age: 10 })
	t.flush()
	t.oldClient.store.put([user])
	t.flush()

	expect(t.server.room.state.get().documents[user.id].state).toMatchObject({
		name: 'bob',
		birthdate: null,
	})
	expect(t.server.room.state.get().documents[user.id].state).not.toMatchObject({
		name: 'bob',
		age: 10,
	})

	expect(t.newClient.store.get(user.id as any)).toMatchObject({
		name: 'bob',
		birthdate: null,
	})
	expect(t.newClient.store.get(user.id as any)).not.toMatchObject({ name: 'bob', age: 10 })
})

test('the server can send v2 stuff to the v1 client', () => {
	const t = new TestInstance()
	t.oldSocketPair.connect()
	t.newSocketPair.connect()

	const user = UserV2.create({ name: 'bob', birthdate: '2022-01-09' })
	t.flush()
	t.newClient.store.put([user])
	t.flush()

	expect(t.server.room.state.get().documents[user.id].state).toMatchObject({
		name: 'bob',
		birthdate: '2022-01-09',
	})

	expect(t.oldClient.store.get(user.id as any)).toMatchObject({
		name: 'bob',
		age: 0,
	})
	expect(t.oldClient.store.get(user.id as any)).not.toMatchObject({
		name: 'bob',
		birthdate: '2022-01-09',
	})
})

test('the server will run schema migrations on a snapshot', () => {
	const bob = UserV1.create({ name: 'bob', age: 10 })
	// joe will be deleted
	const joe = UserV1.create({ name: 'joe', age: 10 })
	const t = new TestInstance(
		{
			documents: [
				{ state: bob, lastChangedClock: 5 },
				{ state: joe, lastChangedClock: 5 },
			],
			clock: 10,
			schema: schemaV1.serialize(),
			tombstones: {},
		},
		schemaV1,
		schemaV3
	)

	expect(t.server.room.state.get().documents[bob.id].state).toMatchObject({
		name: 'bob',
		birthdate: null,
	})
	expect(t.server.room.state.get().documents[joe.id]).toBeUndefined()

	// there should be someone named steve
	const snapshot = t.server.room.getSnapshot()
	expect(snapshot.documents.find((u: any) => u.state.name === 'steve')).toBeDefined()
})

test('clients will receive updates from a snapshot migration upon connection', () => {
	const t = new TestInstance()
	t.oldSocketPair.connect()
	t.newSocketPair.connect()

	const bob = UserV2.create({ name: 'bob', birthdate: '2022-01-09' })
	const joe = UserV2.create({ name: 'joe', birthdate: '2022-01-09' })
	t.flush()
	t.newClient.store.put([bob, joe])
	t.flush()

	const snapshot = t.server.room.getSnapshot()

	t.oldSocketPair.disconnect()
	t.newSocketPair.disconnect()

	const newServer = new TestServer(schemaV3, snapshot)

	const newClientSocketPair = new TestSocketPair('test_upgrade__brand_new', newServer)

	// need to set these two things to get the message through
	newClientSocketPair.callbacks['onReceiveMessage'] = jest.fn()
	newClientSocketPair.clientSocket.connectionStatus = 'online'

	const id = 'test_upgrade_brand_new'
	const newClientSocket = mockSocket()
	newServer.room.handleNewSession(id, newClientSocket)
	newServer.room.handleMessage(id, {
		type: 'connect',
		connectRequestId: 'test',
		lastServerClock: snapshot.clock,
		protocolVersion: TLSYNC_PROTOCOL_VERSION,
		schema: schemaV3.serialize(),
	})

	expect((newClientSocket.sendMessage as jest.Mock).mock.calls[0][0]).toMatchObject({
		// we should have added steve and deleted joe
		diff: {
			[joe.id]: [RecordOpType.Remove],
			['user:steve']: [RecordOpType.Put, { name: 'steve', birthdate: '2022-02-02' }],
		},
	})
})

test('out-of-date clients will receive incompatibility errors', () => {
	const v3server = new TestServer(schemaV3)

	const id = 'test_upgrade_v2'
	const socket = mockSocket()

	v3server.room.handleNewSession(id, socket)
	v3server.room.handleMessage(id, {
		type: 'connect',
		connectRequestId: 'test',
		lastServerClock: 0,
		protocolVersion: TLSYNC_PROTOCOL_VERSION,
		schema: schemaV2.serialize(),
	})

	expect(socket.sendMessage).toHaveBeenCalledWith({
		type: 'incompatibility_error',
		reason: TLIncompatibilityReason.ClientTooOld,
	})
})

test('clients using an out-of-date protocol will receive compatibility errors', () => {
	const v2server = new TestServer(schemaV2)

	const id = 'test_upgrade_v3'
	const socket = mockSocket()

	v2server.room.handleNewSession(id, socket)
	v2server.room.handleMessage(id, {
		type: 'connect',
		connectRequestId: 'test',
		lastServerClock: 0,
		protocolVersion: TLSYNC_PROTOCOL_VERSION - 1,
		schema: schemaV2.serialize(),
	})

	expect(socket.sendMessage).toHaveBeenCalledWith({
		type: 'incompatibility_error',
		reason: TLIncompatibilityReason.ClientTooOld,
	})
})

test('clients using a too-new protocol will receive compatibility errors', () => {
	const v2server = new TestServer(schemaV2)

	const id = 'test_upgrade_v3'
	const socket = mockSocket()

	v2server.room.handleNewSession(id, socket)
	v2server.room.handleMessage(id, {
		type: 'connect',
		connectRequestId: 'test',
		lastServerClock: 0,
		protocolVersion: TLSYNC_PROTOCOL_VERSION + 1,
		schema: schemaV2.serialize(),
	})

	expect(socket.sendMessage).toHaveBeenCalledWith({
		type: 'incompatibility_error',
		reason: TLIncompatibilityReason.ServerTooOld,
	})
})

describe('when the client is too new', () => {
	function setup() {
		const steve = UserV1.create({ id: UserV1.createId('steve'), name: 'steve', age: 23 })
		const jeff = UserV1.create({ id: UserV1.createId('jeff'), name: 'jeff', age: 23 })
		const annie = UserV1.create({ id: UserV1.createId('annie'), name: 'annie', age: 23 })
		const v1Server = new TestServer(schemaV1, {
			clock: 10,
			documents: [
				{
					state: steve,
					lastChangedClock: 10,
				},
				{
					state: jeff,
					lastChangedClock: 10,
				},
				{
					state: annie,
					lastChangedClock: 10,
				},
			],
			schema: schemaV1.serialize(),
			tombstones: {},
		})

		const v2_id = 'test_upgrade_v2'
		const v2_socket = mockSocket<RV2>()

		const v1_id = 'test_upgrade_v1'
		const v1_socket = mockSocket<RV1>()

		v1Server.room.handleNewSession(v1_id, v1_socket)
		v1Server.room.handleMessage(v1_id, {
			type: 'connect',
			connectRequestId: 'test',
			lastServerClock: 10,
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV1.serialize(),
		})

		v1Server.room.handleNewSession(v2_id, v2_socket as any)
		v1Server.room.handleMessage(v2_id as any, {
			type: 'connect',
			connectRequestId: 'test',
			lastServerClock: 10,
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV2.serialize(),
		})

		expect(v2_socket.sendMessage).toHaveBeenCalledWith({
			type: 'connect',
			connectRequestId: 'test',
			hydrationType: 'wipe_presence',
			diff: {},
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV1.serialize(),
			serverClock: 10,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(v1_socket.sendMessage).toHaveBeenCalledWith({
			type: 'connect',
			connectRequestId: 'test',
			hydrationType: 'wipe_presence',
			diff: {},
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV1.serialize(),
			serverClock: 10,
		} satisfies TLSocketServerSentEvent<RV1>)
		;(v2_socket.sendMessage as jest.Mock).mockClear()
		;(v1_socket.sendMessage as jest.Mock).mockClear()

		return {
			v1Server,
			v1_id,
			v2_id,
			v2SendMessage: v2_socket.sendMessage as jest.Mock,
			v1SendMessage: v1_socket.sendMessage as jest.Mock,
			steve,
			jeff,
			annie,
		}
	}

	let data: ReturnType<typeof setup>

	beforeEach(() => {
		data = setup()
	})

	it('allows deletions from v2 client', () => {
		const { v1Server, v2_id, v2SendMessage, steve } = data
		v1Server.room.handleMessage(v2_id as any, {
			type: 'push',
			clientClock: 1,
			diff: {
				[steve.id]: [RecordOpType.Remove],
			},
		})

		expect(v2SendMessage).toHaveBeenCalledWith({
			type: 'push_result',
			action: 'commit',
			clientClock: 1,
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)
	})

	it('applies changes atomically', () => {
		data.v1Server.room.handleMessage(data.v2_id, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.jeff.id]: [RecordOpType.Remove],
				[data.steve.id]: [RecordOpType.Remove],
				[data.annie.id]: [RecordOpType.Put, { ...data.annie, birthdate: '1999-02-21' } as any],
			},
		})

		expect(data.v2SendMessage).toHaveBeenCalledWith({
			type: 'incompatibility_error',
			reason: TLIncompatibilityReason.ServerTooOld,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(data.v1SendMessage).not.toHaveBeenCalled()
		expect(data.v1Server.room.state.get().documents[data.jeff.id]).toBeDefined()
		expect(data.v1Server.room.state.get().documents[data.steve.id]).toBeDefined()
	})

	it('cannot send patches to v2 clients', () => {
		data.v1Server.room.handleMessage(data.v1_id, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.steve.id]: [RecordOpType.Patch, { age: [ValueOpType.Put, 24] }],
			},
		})

		expect(data.v1SendMessage).toHaveBeenCalledWith({
			type: 'push_result',
			action: 'commit',
			clientClock: 1,
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(data.v2SendMessage).toHaveBeenCalledWith({
			type: 'incompatibility_error',
			reason: TLIncompatibilityReason.ServerTooOld,
		} satisfies TLSocketServerSentEvent<RV2>)
	})

	it('cannot apply patches from v2 clients', () => {
		data.v1Server.room.handleMessage(data.v2_id, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.steve.id]: [RecordOpType.Patch, { birthdate: [ValueOpType.Put, 'tomorrow'] }],
			},
		})

		expect(data.v2SendMessage).toHaveBeenCalledWith({
			type: 'incompatibility_error',
			reason: TLIncompatibilityReason.ServerTooOld,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(data.v1SendMessage).not.toHaveBeenCalled()
	})

	it('cannot apply puts from v2 clients', () => {
		data.v1Server.room.handleMessage(data.v2_id, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.steve.id]: [RecordOpType.Put, { ...data.steve, birthdate: 'today' } as any],
			},
		})

		expect(data.v2SendMessage).toHaveBeenCalledWith({
			type: 'incompatibility_error',
			reason: TLIncompatibilityReason.ServerTooOld,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(data.v1SendMessage).not.toHaveBeenCalled()
	})
})

describe('when the client is too old', () => {
	function setup() {
		const steve = UserV2.create({
			id: UserV2.createId('steve'),
			name: 'steve',
			birthdate: null,
		})
		const jeff = UserV2.create({ id: UserV2.createId('jeff'), name: 'jeff', birthdate: null })
		const annie = UserV2.create({
			id: UserV2.createId('annie'),
			name: 'annie',
			birthdate: null,
		})
		const v2Server = new TestServer(schemaV2, {
			clock: 10,
			documents: [
				{
					state: steve,
					lastChangedClock: 10,
				},
				{
					state: jeff,
					lastChangedClock: 10,
				},
				{
					state: annie,
					lastChangedClock: 10,
				},
			],
			schema: schemaV1.serialize(),
			tombstones: {},
		})

		const v2Id = 'test_upgrade_v2'
		const v2Socket = mockSocket<RV2>()

		const v2SendMessage = v2Socket.sendMessage as jest.Mock

		const v1Id = 'test_upgrade_v1'
		const v1Socket = mockSocket<RV1>()

		const v1SendMessage = v1Socket.sendMessage as jest.Mock

		v2Server.room.handleNewSession(v1Id, v1Socket as any)
		v2Server.room.handleMessage(v1Id, {
			type: 'connect',
			connectRequestId: 'test',
			lastServerClock: 10,
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV1.serialize(),
		})

		v2Server.room.handleNewSession(v2Id, v2Socket)
		v2Server.room.handleMessage(v2Id, {
			type: 'connect',
			connectRequestId: 'test',
			lastServerClock: 10,
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV2.serialize(),
		})

		expect(v2SendMessage).toHaveBeenCalledWith({
			type: 'connect',
			connectRequestId: 'test',
			hydrationType: 'wipe_presence',
			diff: {},
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV2.serialize(),
			serverClock: 10,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(v1SendMessage).toHaveBeenCalledWith({
			type: 'connect',
			connectRequestId: 'test',
			hydrationType: 'wipe_presence',
			diff: {},
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV2.serialize(),
			serverClock: 10,
		} satisfies TLSocketServerSentEvent<RV2>)

		v2SendMessage.mockClear()
		v1SendMessage.mockClear()

		return {
			v2Server,
			v2Id,
			v1Id,
			v2SendMessage,
			v1SendMessage,
			steve,
			jeff,
			annie,
		}
	}

	let data: ReturnType<typeof setup>

	beforeEach(() => {
		data = setup()
	})

	it('allows deletions from v1 client', () => {
		data.v2Server.room.handleMessage(data.v2Id, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.steve.id]: [RecordOpType.Remove],
			},
		})

		expect(data.v2SendMessage).toHaveBeenCalledWith({
			type: 'push_result',
			action: 'commit',
			clientClock: 1,
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)
	})

	it('can handle patches from older clients', () => {
		data.v2Server.room.handleMessage(data.v1Id, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.steve.id]: [RecordOpType.Patch, { name: [ValueOpType.Put, 'Jeff'] }],
			},
		})

		expect(data.v1SendMessage).toHaveBeenCalledWith({
			type: 'push_result',
			action: 'commit',
			clientClock: 1,
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(data.v2SendMessage).toHaveBeenCalledWith({
			type: 'patch',
			diff: {
				[data.steve.id]: [
					RecordOpType.Patch,
					{
						name: [ValueOpType.Put, 'Jeff'],
					},
				],
			},
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)
	})
})

describe('when the client is the same version', () => {
	function setup() {
		const steve = UserV2.create({
			id: UserV2.createId('steve'),
			name: 'steve',
			birthdate: null,
		})
		const v2Server = new TestServer(schemaV2, {
			clock: 10,
			documents: [
				{
					state: steve,
					lastChangedClock: 10,
				},
			],
			schema: schemaV2.serialize(),
			tombstones: {},
		})

		const aId = 'v2ClientA'
		const aSocket = mockSocket<RV2>()

		const bId = 'v2ClientB'
		const bSocket = mockSocket<RV2>()

		v2Server.room.handleNewSession(aId, aSocket)
		v2Server.room.handleMessage(aId, {
			type: 'connect',
			connectRequestId: 'test',
			lastServerClock: 10,
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: JSON.parse(JSON.stringify(schemaV2.serialize())),
		})

		v2Server.room.handleNewSession(bId, bSocket)
		v2Server.room.handleMessage(bId, {
			type: 'connect',
			connectRequestId: 'test',
			lastServerClock: 10,
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: JSON.parse(JSON.stringify(schemaV2.serialize())),
		})

		expect(aSocket.sendMessage).toHaveBeenCalledWith({
			type: 'connect',
			connectRequestId: 'test',
			hydrationType: 'wipe_presence',
			diff: {},
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV2.serialize(),
			serverClock: 10,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(bSocket.sendMessage).toHaveBeenCalledWith({
			type: 'connect',
			connectRequestId: 'test',
			hydrationType: 'wipe_presence',
			diff: {},
			protocolVersion: TLSYNC_PROTOCOL_VERSION,
			schema: schemaV2.serialize(),
			serverClock: 10,
		} satisfies TLSocketServerSentEvent<RV2>)
		;(aSocket.sendMessage as jest.Mock).mockClear()
		;(bSocket.sendMessage as jest.Mock).mockClear()

		return {
			v2Server,
			aId,
			bId,
			v2ClientASendMessage: aSocket.sendMessage as jest.Mock,
			v2ClientBSendMessage: bSocket.sendMessage as jest.Mock,
			steve,
		}
	}

	let data: ReturnType<typeof setup>

	beforeEach(() => {
		data = setup()
	})

	it('sends minimal patches', () => {
		data.v2Server.room.handleMessage(data.aId, {
			type: 'push',
			clientClock: 1,
			diff: {
				[data.steve.id]: [RecordOpType.Patch, { name: [ValueOpType.Put, 'Jeff'] }],
			},
		})

		expect(data.v2ClientASendMessage).toHaveBeenCalledWith({
			type: 'push_result',
			action: 'commit',
			clientClock: 1,
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)

		expect(data.v2ClientBSendMessage).toHaveBeenCalledWith({
			type: 'patch',
			diff: {
				[data.steve.id]: [
					RecordOpType.Patch,
					{
						name: [ValueOpType.Put, 'Jeff'],
					},
				],
			},
			serverClock: 11,
		} satisfies TLSocketServerSentEvent<RV2>)
	})
})
