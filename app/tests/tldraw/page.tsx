'use client'

import '@tldraw/tldraw/tldraw.css'
import { RecordsDiff, TLRecord, Tldraw, useEditor } from '@tldraw/tldraw'
import { useEffect, useRef } from 'react'
import { FlowTimelineScrubber } from '@/components';

const TldrawPage = () => {
	return (
		<div className="tldraw__editor w-full h-full flex flex-col overflow-hidden">
			<Tldraw autoFocus>
        <div className="absolute top-20 left-0 w-auto h-auto z-[501]">
				<FlowTimelineScrubber />
        </div>
			</Tldraw>
		</div>
	)
};

export default TldrawPage;