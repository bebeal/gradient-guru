import { track, useEditor } from '@tldraw/editor'
import { useRef } from 'react'
import { useActions } from '../hooks/useActions'
import { useReadonly } from '../hooks/useReadonly'
import { useTranslation } from '../hooks/useTranslation/useTranslation'
import { Button } from './primitives/Button'
import { kbdStr } from './primitives/shared'

export const TrashButton = track(function TrashButton() {
	const editor = useEditor()
	const actions = useActions()
	const msg = useTranslation()
	const action = actions['delete']

	const isReadonly = useReadonly()
	const ref = useRef<HTMLButtonElement>(null)

	if (isReadonly) return null

	return (
		<Button
			icon={action.icon}
			type="icon"
			onClick={() => {
				action.onSelect('quick-actions')
				// focus the container so that when this button becomes disabled we don't lose keyboard focus
				editor.getContainer().focus()
			}}
			disabled={!(editor.isIn('select') && editor.getSelectedShapeIds().length > 0)}
			title={`${msg(action.label!)} ${kbdStr(action.kbd!)}`}
			smallIcon
			ref={ref}
		/>
	)
})
