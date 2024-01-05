'use client'

import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { PageLink } from "./PageLink";
import { formatNodeId } from "..";

export interface PageId {
  id: string;
  isPreview?: boolean;
}

// Fetches the versioned ID from S3 and passes it to PageLink to render the iframe
export const PageId = (props: PageId) => {
  const { id, isPreview=false } = props;
  const [html, setHtml] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const [source, setSource] = useState<string>('');
  const [version, setVersion] = useState<number>(0);
  const [availableVersions, setAvailableVersions] = useState<number[]>([]);
  const api = useApi();

  const SCRIPT_TO_INJECT_FOR_PREVIEW = `
  // send the screenshot to the parent window
window.addEventListener('message', function(event) {
  if (event.data.action === 'take-screenshot' && event.data.shapeid === "shape:${formatNodeId(id)}") {
    html2canvas(document.body, {useCors : true, foreignObjectRendering: true, allowTaint: true }).then(function(canvas) {
      const data = canvas.toDataURL('image/png');
      window.parent.parent.postMessage({screenshot: data, shapeid: "shape:${formatNodeId(id)}"}, "*");
    });
  }
}, false);
// and prevent the user from pinch-zooming into the iframe
  document.body.addEventListener('wheel', e => {
      if (!e.ctrlKey) return;
      e.preventDefault();
  }, { passive: false })
`;

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      api.getS3({ id }).then((response: any) => {
        const htmlFromResponse = response?.html;
        setHtml(html.includes('</body>')
          ? htmlFromResponse.replace(
              '</body>',
              `<script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script><script src="https://unpkg.com/html2canvas"></script><script>${SCRIPT_TO_INJECT_FOR_PREVIEW}</script><script>window.alert = function(e) {console.log('alert from iframe:', e)};</script></body>`
            )
          : htmlFromResponse + `<script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script><script src="https://unpkg.com/html2canvas"></script><script>${SCRIPT_TO_INJECT_FOR_PREVIEW}</script><script>window.alert = function(e) {console.log('alert from iframe:', e)};</script>`);
        
        
        setSource(response?.source);
        setVersion(response?.version);
        setAvailableVersions(response?.availableVersions);
      });
    }
  }, [SCRIPT_TO_INJECT_FOR_PREVIEW, api, html, id, isPreview, mounted]);

	return (
    <div className="relative w-full h-full">
      {/* <div className="absolute flex flex-col gap-1 max-w-[100px] top-0 left-0 bg-black bg-opacity-75 text-white p-3 rounded-lg z-10">
          <div>ID: {id}</div>
          <div>Source: {source}</div>
          <div>Version: {version}</div>
          <div>Available Versions: {availableVersions.join(', ')}</div>
      </div> */}
      <PageLink id={id} html={html} isPreview={isPreview} />
    </div>
  );
};
