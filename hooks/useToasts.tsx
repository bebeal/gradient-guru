'use client'

import { createContext, useCallback, useContext, useState } from "react";
import { uniqueId } from "@tldraw/tldraw";
import { TLUiToast } from "@/components";


export type TLUiToastsContextType = {
	addToast: (toast: Omit<TLUiToast, 'id'> & { id?: string }) => string
	removeToast: (id: TLUiToast['id']) => string
	clearToasts: () => void
	toasts: TLUiToast[]
}
export const ToastsContext = createContext({} as TLUiToastsContextType);

export type ToastsProviderProps = {
	overrides?: (editor: any) => TLUiToastsContextType;
	children: any;
}
export const ToastsProvider = ({ children }: ToastsProviderProps) => {
	const [toasts, setToasts] = useState<TLUiToast[]>([]);

	const addToast = useCallback((toast: Omit<TLUiToast, 'id'> & { id?: string }) => {
		const id = toast.id ?? uniqueId();
		setToasts((d) => [...d.filter((m) => m.id !== toast.id), { ...toast, id }]);
		return id;
	}, [])

	const removeToast = useCallback((id: string) => {
		setToasts((d) => d.filter((m) => m.id !== id));
		return id;
	}, [])

	const clearToasts = useCallback(() => {
		setToasts([]);
	}, [])

	return (
		<ToastsContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
			{children}
		</ToastsContext.Provider>
	)
}

export const useToasts = () => {
	const ctx = useContext(ToastsContext);

	if (!ctx) {
		throw new Error('useToasts must be used within a ToastsProvider');
	}

	return ctx
}
