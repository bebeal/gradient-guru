import { GeoShapeGeoStyle, preventDefault, track, useEditor, useValue } from '@tldraw/editor'
import classNames from 'classnames'
import hotkeys from 'hotkeys-js'
import React, { memo, useEffect, useMemo } from 'react'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { areShortcutsDisabled } from '../../hooks/useKeyboardShortcuts'
import { useReadonly } from '../../hooks/useReadonly'
import { TLUiToolbarItem, useToolbarSchema } from '../../hooks/useToolbarSchema'
import { TLUiToolItem } from '../../hooks/useTools'
import { useTranslation } from '../../hooks/useTranslation/useTranslation'
import { ActionsMenu } from '../ActionsMenu'
import { DuplicateButton } from '../DuplicateButton'
import { MobileStylePanel } from '../MobileStylePanel'
import { RedoButton } from '../RedoButton'
import { TrashButton } from '../TrashButton'
import { UndoButton } from '../UndoButton'
import { Button } from '../primitives/Button'
import * as M from '../primitives/DropdownMenu'
import { kbdStr } from '../primitives/shared'
import { ToggleToolLockedButton } from './ToggleToolLockedButton'

/** @public */
export const Toolbar = memo(function Toolbar() {
	const editor = useEditor()
	const msg = useTranslation()
	const breakpoint = useBreakpoint()

	const rMostRecentlyActiveDropdownItem = React.useRef<TLUiToolbarItem | undefined>(undefined)

	const isReadonly = useReadonly()
	const toolbarItems = useToolbarSchema()

	const activeToolId = useValue('current tool id', () => editor.getCurrentToolId(), [editor])

	const geoState = useValue(
		'geo',
		() => editor.getSharedStyles().getAsKnownValue(GeoShapeGeoStyle),
		[editor]
	)

	const getTitle = (item: TLUiToolItem) =>
		item.label ? `${msg(item.label)} ${item.kbd ? kbdStr(item.kbd) : ''}` : ''

	const activeTLUiToolbarItem = toolbarItems.find((item) => {
		return isActiveTLUiToolItem(item.toolItem, activeToolId, geoState)
	})

	const { itemsInPanel, itemsInDropdown } = useToolbarItems()
	const dropdownFirstItem = useMemo(() => {
		let dropdownFirstItem = itemsInDropdown.find((item) => item === activeTLUiToolbarItem)

		if (!dropdownFirstItem) {
			// If we don't have a currently active dropdown item, use the most
			// recently active dropdown item as the current dropdown first item.

			// If haven't ever had a most recently active dropdown item, then
			// make the first item in the dropdown menu the most recently
			// active dropdown item.
			if (!rMostRecentlyActiveDropdownItem.current) {
				rMostRecentlyActiveDropdownItem.current = itemsInDropdown[0]
			}

			dropdownFirstItem = rMostRecentlyActiveDropdownItem.current

			// If the most recently active dropdown item is no longer in the
			// dropdown (because the breakpoint has changed) then make the
			// first item in the dropdown menu the most recently active
			// dropdown item.
			if (!itemsInDropdown.includes(dropdownFirstItem)) {
				dropdownFirstItem = itemsInDropdown[0]
			}
		}

		// We want this ref set to remember which item from the current
		// set of dropdown items was most recently active
		rMostRecentlyActiveDropdownItem.current = dropdownFirstItem

		return dropdownFirstItem
	}, [activeTLUiToolbarItem, itemsInDropdown])

	useEffect(() => {
		const itemsWithShortcuts = [...itemsInPanel, dropdownFirstItem]
		for (let i = 0; i < Math.min(10, itemsWithShortcuts.length); i++) {
			const indexKbd = `${i + 1}`.slice(-1)
			hotkeys(indexKbd, (event) => {
				if (areShortcutsDisabled(editor)) return
				preventDefault(event)
				itemsWithShortcuts[i].toolItem.onSelect('kbd')
			})
		}
		return () => {
			hotkeys.unbind('1,2,3,4,5,6,7,8,9,0')
		}
	}, [dropdownFirstItem, editor, itemsInPanel])

	return (
		<div className="tlui-toolbar">
			<div className="tlui-toolbar__inner">
				<div className="tlui-toolbar__left">
					{!isReadonly && (
						<div className="tlui-toolbar__extras">
							{breakpoint < 6 && !(activeToolId === 'hand' || activeToolId === 'zoom') && (
								<div className="tlui-toolbar__extras__controls tlui-buttons__horizontal">
									<UndoButton />
									<RedoButton />
									<TrashButton />
									<DuplicateButton />
									<ActionsMenu />
								</div>
							)}
							<ToggleToolLockedButton activeToolId={activeToolId} />
						</div>
					)}
					<div
						className={classNames('tlui-toolbar__tools', {
							'tlui-toolbar__tools__mobile': breakpoint < 5,
						})}
					>
						{/* Main panel items */}
						{itemsInPanel.map(({ toolItem }) => {
							return (
								<ToolbarButton
									key={toolItem.id}
									item={toolItem}
									title={getTitle(toolItem)}
									isSelected={isActiveTLUiToolItem(toolItem, activeToolId, geoState)}
								/>
							)
						})}
						{/* Overflowing Shapes */}
						{itemsInDropdown.length ? (
							<>
								{/* Last selected (or first) item from the overflow */}
								<ToolbarButton
									key={dropdownFirstItem.toolItem.id}
									item={dropdownFirstItem.toolItem}
									title={getTitle(dropdownFirstItem.toolItem)}
									isSelected={isActiveTLUiToolItem(
										dropdownFirstItem.toolItem,
										activeToolId,
										geoState
									)}
								/>
								{/* The dropdown to select everything else */}
								<M.Root id="toolbar overflow" modal={false}>
									<M.Trigger>
										<Button
											className="tlui-toolbar__overflow"
											icon="chevron-up"
											type="tool"
											data-testid="tools.more"
											title={msg('tool-panel.more')}
										/>
									</M.Trigger>
									<M.Content side="top" align="center">
										<OverflowToolsContent toolbarItems={itemsInDropdown} />
									</M.Content>
								</M.Root>
							</>
						) : null}
					</div>
				</div>
				{breakpoint < 5 && !isReadonly && (
					<div className="tlui-toolbar__tools">
						<MobileStylePanel />
					</div>
				)}
			</div>
		</div>
	)
})

const OverflowToolsContent = track(function OverflowToolsContent({
	toolbarItems,
}: {
	toolbarItems: TLUiToolbarItem[]
}) {
	const msg = useTranslation()

	return (
		<div className="tlui-buttons__grid">
			{toolbarItems.map(({ toolItem: { id, meta, kbd, label, onSelect, icon } }) => {
				return (
					<M.Item
						key={id}
						type="icon"
						className="tlui-button-grid__button"
						data-testid={`tools.more.${id}`}
						data-tool={id}
						data-geo={meta?.geo ?? ''}
						aria-label={label}
						onClick={() => onSelect('toolbar')}
						title={label ? `${msg(label)} ${kbd ? kbdStr(kbd) : ''}` : ''}
						icon={icon}
					/>
				)
			})}
		</div>
	)
})

function ToolbarButton({
	item,
	title,
	isSelected,
}: {
	item: TLUiToolItem
	title: string
	isSelected: boolean
}) {
	return (
		<Button
			type="tool"
			data-testid={`tools.${item.id}`}
			data-tool={item.id}
			data-geo={item.meta?.geo ?? ''}
			aria-label={item.label}
			title={title}
			icon={item.icon}
			data-state={isSelected ? 'selected' : undefined}
			onClick={() => item.onSelect('toolbar')}
			onTouchStart={(e) => {
				preventDefault(e)
				item.onSelect('toolbar')
			}}
		/>
	)
}

const isActiveTLUiToolItem = (
	item: TLUiToolItem,
	activeToolId: string | undefined,
	geoState: string | null | undefined
) => {
	return item.meta?.geo
		? activeToolId === 'geo' && geoState === item.meta?.geo
		: activeToolId === item.id
}

export function useToolbarItems() {
	const breakpoint = useBreakpoint()
	const allToolbarItems = useToolbarSchema()
	const isReadonly = useReadonly()
	return useMemo(() => {
		const visibleItems = allToolbarItems.filter((item) => !isReadonly || item.readonlyOk)
		const overflowIndex = Math.min(8, 5 + breakpoint)

		const itemsInPanel = visibleItems.slice(0, overflowIndex)
		const itemsInDropdown = visibleItems.slice(overflowIndex)

		if (itemsInDropdown.length <= 2) {
			return {
				itemsInPanel: visibleItems,
				itemsInDropdown: [],
			}
		}

		return { itemsInPanel, itemsInDropdown }
	}, [allToolbarItems, breakpoint, isReadonly])
}
