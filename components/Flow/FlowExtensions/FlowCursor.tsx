import { ComponentType, useRef } from 'react'
import { cn } from '@/utils';
import { useTransform } from "@tldraw/editor";
import { IconSetCache } from '@/components';

export enum BotStatusEnum {
  Idle = 'Idle',
  Thinking = 'Thinking',
  Working = 'Working',
}

export type FlowCursorComponent = ComponentType<{
	className?: string
	point: any
	zoom: number
	color?: string
	name: string | null
	chatMessage: React.ReactNode | string | null
}>

export const FlowCursor: FlowCursorComponent = ({ className, zoom, point, color, name, chatMessage }) => {
	const rCursor = useRef<HTMLDivElement>(null);
	useTransform(rCursor, point?.x, point?.y, 1 / zoom);

  const chatMesageIsBotStatus = typeof chatMessage === 'string' && Object.values(BotStatusEnum).includes(chatMessage as BotStatusEnum)
	if (!point) return null

	return (
		<div ref={rCursor} className={cn('tl-overlays__item', className)}>
			<svg className="tl-cursor">
				<use href="#cursor" color={color} />
			</svg>
			{chatMessage ? (
				<>
					{name && (
						<div className="tl-nametag-title" style={{ color }}>
							{name}
						</div>
					)}
					<div className="tl-nametag-chat flex gap-1 items-end h-auto" style={{ backgroundColor: color}}>
            <div>{chatMessage}</div>
            {chatMesageIsBotStatus && <div className="w-[16px] translate-y-[-2px]">
              <IconSetCache.Custom.DotsLoader />
            </div>}
          </div>
				</>
			) : (
				name && (
					<div className="tl-nametag" style={{ backgroundColor: color }}>
						{name}
					</div>
				)
			)}
		</div>
	)
}
