'use client'

import { createContext, useCallback, useContext, useState } from "react";
import { Toast } from "@/components";
import { nanoid } from "nanoid";

export type ToastContextType = {
	addToast: (toast: Omit<Toast, 'id'> & { id?: string }) => string
	removeToast: (id: Toast['id']) => string
	clearToasts: () => void
	toasts: Toast[]
};
export const ToastsContext = createContext({} as ToastContextType);

export type ToastsProviderProps = {
	children: any;
};
export const ToastsProvider = ({ children }: ToastsProviderProps) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((toast: Omit<Toast, 'id'> & { id?: string }) => {
		const id = toast.id ?? nanoid();
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
