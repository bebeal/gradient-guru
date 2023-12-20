import { useEffect, useState } from "react";
import * as T from "@radix-ui/react-toast";
import { useToasts } from "@/hooks";

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
}