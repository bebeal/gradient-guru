import { memo } from "react"
import { useToasts } from "@/hooks"
import { Toast } from "./Toast"


export const Toasts = memo(() => {
	const { toasts } = useToasts();

	return (
		<>
			{toasts.map((toast) => (
				<Toast key={toast.id} toast={toast} />
			))}
		</>
	)
});
