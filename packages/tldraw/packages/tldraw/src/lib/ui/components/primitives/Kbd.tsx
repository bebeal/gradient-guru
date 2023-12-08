import { cn } from '@/utils'
import { Kbd as Kbd2 } from '@/components'
import { kbd } from './shared'

/** @internal */
export interface KbdProps {
	children: string
}

/** @internal */
export function Kbd({ children }: KbdProps) {

	return (
		<Kbd2>
			{kbd(children).join('')}
		</Kbd2>
	)
}
