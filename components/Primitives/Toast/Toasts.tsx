import { memo } from "react"
import { useToasts } from "@/hooks"
import { Toast } from "./Toast"


const _Toasts = () => {
	const { toasts } = useToasts()

	return (
		<>
			{toasts.map((toast) => (
				<Toast key={toast.id} toast={toast} />
			))}
		</>
	)
};

export const Toasts = memo(_Toasts);
