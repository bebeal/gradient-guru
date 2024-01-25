'use client'

import { Button, Icon, TLUiIconType, useToasts, useTranslation, TLUiToastAction } from "@tldraw/tldraw";
import * as T from '@radix-ui/react-toast'
import { ReactNode } from "react";

export interface TLUiToast {
	id: string;
	icon?: TLUiIconType;
	title?: string;
	description?: any | ReactNode | string;
	actions?: TLUiToastAction[];
	keepOpen?: boolean;
  duration?: number;
	closeLabel?: string;
}

export interface ToastProps {
  toast: TLUiToast;
}
export const Toast = ({ toast }: ToastProps) => {
	const { removeToast } = useToasts();
	const msg = useTranslation();

	const onOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			removeToast(toast.id)
		}
	}

	const hasActions = toast.actions && toast.actions.length > 0

	return (
		<T.Root
			onOpenChange={onOpenChange}
			className="tlui-toast__container flex !flex-col"
			duration={toast.keepOpen ? Infinity : toast?.duration || 2000}
		>
			{toast.icon && (
				<div className="tlui-toast__icon">
					<Icon icon={toast.icon as TLUiIconType} />
				</div>
			)}
			<div className="tlui-toast__main">
				<div className="tlui-toast__content">
					{toast.title && <T.Title className="tlui-toast__title text-sm font-bold">{toast.title}</T.Title>}
					{toast.description && (
						<T.Description className="tlui-toast__description">{toast.description}</T.Description>
					)}
				</div>
				{toast.actions && (
					<div className="tlui-toast__actions">
						{toast.actions.map((action, i) => (
							<T.Action key={i} altText={action.label} asChild onClick={action.onClick}>
								<Button type={action.type}>{action.label}</Button>
							</T.Action>
						))}
						<T.Close asChild>
							<Button type="normal" className="tlui-toast__close" style={{ marginLeft: 'auto' }}>
								{toast.closeLabel ?? msg('toast.close')}
							</Button>
						</T.Close>
					</div>
				)}
			</div>
			{!hasActions && (
				<T.Close asChild>
					<Button type="normal" className="tlui-toast__close">
						{toast.closeLabel ?? msg('toast.close')}
					</Button>
				</T.Close>
			)}
		</T.Root>
	)
}