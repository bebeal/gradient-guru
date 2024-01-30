import { Editor, TLPointerEventInfo, preventDefault, useEditor, useValue } from '@tldraw/editor'
import hotkeys from 'hotkeys-js'
import { useEffect } from 'react'
import { useToolbarItems } from '../components/Toolbar/Toolbar'
import { useActions } from './useActions'
import { useReadonly } from './useReadonly'
import { useTools } from './useTools'

const SKIP_KBDS = [
	// we set these in useNativeClipboardEvents instead
	'copy',
	'cut',
	'paste',
	// There's also an upload asset action, so we don't want to set the kbd twice
	'asset',
]

/** @public */
export function useKeyboardShortcuts() {
	const editor = useEditor()

	const isReadonly = useReadonly()
	const actions = useActions()
	const tools = useTools()
	const isFocused = useValue('is focused', () => editor.getInstanceState().isFocused, [editor])
	const { itemsInPanel: toolbarItemsInPanel } = useToolbarItems()

	useEffect(() => {
		if (!isFocused) return

		const container = editor.getContainer()

		hotkeys.setScope(editor.store.id)

		const hot = (keys: string, callback: (event: KeyboardEvent) => void) => {
			hotkeys(keys, { element: container, scope: editor.store.id }, callback)
		}

		const hotUp = (keys: string, callback: (event: KeyboardEvent) => void) => {
			hotkeys(
				keys,
				{ element: container, keyup: true, keydown: false, scope: editor.store.id },
				callback
			)
		}

		// Add hotkeys for actions and tools.
		// Except those that in SKIP_KBDS!
		for (const action of Object.values(actions)) {
			if (!action.kbd) continue
			if (isReadonly && !action.readonlyOk) continue
			if (SKIP_KBDS.includes(action.id)) continue

			hot(getHotkeysStringFromKbd(action.kbd), (event) => {
				if (areShortcutsDisabled(editor)) return
				preventDefault(event)
				action.onSelect('kbd')
			})
		}

		for (const tool of Object.values(tools)) {
			if (!tool.kbd || (!tool.readonlyOk && editor.getInstanceState().isReadonly)) {
				continue
			}

			if (SKIP_KBDS.includes(tool.id)) continue

			hot(getHotkeysStringFromKbd(tool.kbd), (event) => {
				if (areShortcutsDisabled(editor)) return
				preventDefault(event)
				tool.onSelect('kbd')
			})
		}

		hot(',', (e) => {
			// Skip if shortcuts are disabled
			if (areShortcutsDisabled(editor)) return

			// Don't press again if already pressed
			if (editor.inputs.keys.has('Comma')) return

			preventDefault(e) // prevent whatever would normally happen
			container.focus() // Focus if not already focused

			editor.inputs.keys.add('Comma')

			const { x, y, z } = editor.inputs.currentScreenPoint
			const info: TLPointerEventInfo = {
				type: 'pointer',
				name: 'pointer_down',
				point: { x, y, z },
				shiftKey: e.shiftKey,
				altKey: e.altKey,
				ctrlKey: e.metaKey || e.ctrlKey,
				pointerId: 0,
				button: 0,
				isPen: editor.getInstanceState().isPenMode,
				target: 'canvas',
			}

			editor.dispatch(info)
		})

		hotUp(',', (e) => {
			if (areShortcutsDisabled(editor)) return
			if (!editor.inputs.keys.has('Comma')) return

			editor.inputs.keys.delete('Comma')

			const { x, y, z } = editor.inputs.currentScreenPoint
			const info: TLPointerEventInfo = {
				type: 'pointer',
				name: 'pointer_up',
				point: { x, y, z },
				shiftKey: e.shiftKey,
				altKey: e.altKey,
				ctrlKey: e.metaKey || e.ctrlKey,
				pointerId: 0,
				button: 0,
				isPen: editor.getInstanceState().isPenMode,
				target: 'canvas',
			}

			editor.dispatch(info)
		})

		return () => {
			hotkeys.deleteScope(editor.store.id)
		}
	}, [actions, tools, isReadonly, editor, isFocused, toolbarItemsInPanel])
}

function getHotkeysStringFromKbd(kbd: string) {
	return getKeys(kbd)
		.map((kbd) => {
			let str = ''
			const chars = kbd.split('')
			if (chars.length === 1) {
				str = chars[0]
			} else {
				if (chars[0] === '!') {
					str = `shift+${chars[1]}`
				} else if (chars[0] === '?') {
					if (chars.length === 3 && chars[1] === '!') {
						str = `alt+shift+${chars[2]}`
					} else {
						str = `alt+${chars[1]}`
					}
				} else if (chars[0] === '$') {
					if (chars[1] === '!') {
						str = `cmd+shift+${chars[2]},ctrl+shift+${chars[2]}`
					} else if (chars[1] === '?') {
						str = `cmd+⌥+${chars[2]},ctrl+alt+${chars[2]}`
					} else {
						str = `cmd+${chars[1]},ctrl+${chars[1]}`
					}
				} else {
					str = kbd
				}
			}
			return str
		})
		.join(',')
}

// Logic to split kbd string from hotkeys-js util.
function getKeys(key: string) {
	if (typeof key !== 'string') key = ''
	key = key.replace(/\s/g, '')
	const keys = key.split(',')
	let index = keys.lastIndexOf('')

	for (; index >= 0; ) {
		keys[index - 1] += ','
		keys.splice(index, 1)
		index = keys.lastIndexOf('')
	}

	return keys
}

export function areShortcutsDisabled(editor: Editor) {
	return editor.getIsMenuOpen() || editor.getEditingShapeId() !== null || editor.getCrashingError()
}
