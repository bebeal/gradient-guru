'use client'

import { useToasts } from '@/hooks';
import * as T from '@radix-ui/react-toast'
import { memo, ReactNode, useEffect, useState } from "react";
import { Button } from './Button';

export interface ToastAction {
	type: 'primary' | 'danger' | 'normal'
	label: string
	onClick: () => void
}

export interface IToast {
	id: string;
	icon?: any;
	title?: string;
	description?: any | ReactNode | string;
	actions?: ToastAction[];
	keepOpen?: boolean;
  duration?: number;
	closeLabel?: string;
}

export interface ToastProps {
  toast: IToast;
}
export const Toast = ({ toast }: ToastProps) => {
	const { removeToast } = useToasts();

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
					{/* <TldrawUiIcon icon={toast.icon} /> */}
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
								{toast.closeLabel ?? 'Close'}
							</Button>
						</T.Close>
					</div>
				)}
			</div>
			{!hasActions && (
				<T.Close asChild>
					<Button type="normal" className="tlui-toast__close">
						{toast.closeLabel ?? 'Close'}
					</Button>
				</T.Close>
			)}
		</T.Root>
	)
}

export const Toasts = memo(() => {
  const { toasts } = useToasts();

  return (
    <>
      {toasts.map((toast: IToast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </>
  );
});

export const ToastViewport = () => {
	const toast = useToasts();

	const [hasToasts, setHasToasts] = useState(false);

	useEffect(() => {
		let cancelled = false;
		if (toast.toasts.length) {
			setHasToasts(true);
		} else {
			setTimeout(() => {
				if (!cancelled) {
					setHasToasts(false);
				}
			}, 1000);
		}

		return () => {
			cancelled = true;
		}
	}, [toast]);

	if (!hasToasts) return null;

	return (<T.ToastViewport className="tlui-toast__viewport" />);
};
