'use client'

import { Tldraw } from '@tldraw/tldraw';
// import { useToasts } from '@tldraw/tldraw/src/lib/ui/hooks/useToastsProvider';
import '@tldraw/tldraw/tldraw.css'

const TldrawPage = () => {
	return (
		<div className="tldraw__editor w-full h-full flex flex-col overflow-hidden">
			<Tldraw autoFocus >
			</Tldraw>
		</div>
	)
};

export default TldrawPage;