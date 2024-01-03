'use client'

import { useEffect } from "react";
import { formatNodeId } from "..";

export const InvalidLinkHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invalid Link</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
  </head>
  <body>
  <div class="flex flex-col justify-center items-center w-full h-screen gap-5 overflow-auto bg-[#1f1f1f] text-white">
    <div class="flex w-auto h-auto justify-center items-center gap-4 flex-wrap overflow-auto p-10 text-sm">Invalid Link</div>
    <div class="flex w-auto h-auto justify-center items-center gap-4 flex-wrap overflow-auto p-10 text-xs">This link is invalid or has expired.</div>
  </div>
  </body>
</html>`;

export interface PageLinkProps {
  className?: string;
  id?: string;
  html?: string;
  isPreview?: boolean;
}

export const PageLink = (props: PageLinkProps) => {
  const {
    className,
    id='',
    html=InvalidLinkHtml,
    isPreview=false
  } = props;

  useEffect(() => {
		// listen for screenshot messages
		if (typeof window !== 'undefined') {
			const windowListener = (event: MessageEvent) => {
				if (event.data.action === 'take-screenshot') {
					const iframe2 = document.getElementById(`iframe-2-shape:${formatNodeId(id)}`) as HTMLIFrameElement
					iframe2?.contentWindow?.postMessage(
						{ action: 'take-screenshot', shapeid: `shape:${formatNodeId(id)}` },
						'*'
					)
				}
			}
			window.addEventListener('message', windowListener)

			return () => {
				window.removeEventListener('message', windowListener)
			}
		}
	}, [id])

	return (
		<iframe
			id={`iframe-2-shape:${id}`}
			srcDoc={html}
			draggable={false}
      className={className}
			style={{
				position: 'fixed',
				inset: 0,
				width: '100%',
				height: '100%',
				border: 'none',
			}}
		/>
	)
};
