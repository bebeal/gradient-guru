'use client'

import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { PageLink } from "./PageLink";

export interface PageId {
  id: string;
  isPreview?: boolean;
}

export const PageId = (props: PageId) => {
  const { id, isPreview=false } = props;
  const [html, setHtml] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const [source, setSource] = useState<string>('');
  const [linkUploadVersion, setLinkUploadVersion] = useState<number>(0);
  const api = useApi();

  const SCRIPT_TO_INJECT_FOR_PREVIEW = `
    // send the screenshot to the parent window
  window.addEventListener('message', function(event) {
    if (event.data.action === 'take-screenshot' && event.data.shapeid === "shape:${id}") {
      html2canvas(document.body, {useCors : true, foreignObjectRendering: true, allowTaint: true }).then(function(canvas) {
        const data = canvas.toDataURL('image/png');
        window.parent.parent.postMessage({screenshot: data, shapeid: "shape:${id}"}, "*");
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
        if (isPreview) {
          setHtml(htmlFromResponse.includes('</body>')
          ? htmlFromResponse.replace(
              '</body>',
              `<script src="https://unpkg.com/html2canvas"></script><script>${SCRIPT_TO_INJECT_FOR_PREVIEW}</script></body>`)
          : htmlFromResponse + `<script>${SCRIPT_TO_INJECT_FOR_PREVIEW}</script>`)
        } else {
          setHtml(htmlFromResponse);
        }
        setSource(response?.source);
        setLinkUploadVersion(response?.linkUploadVersion);
      });
    }
  }, [SCRIPT_TO_INJECT_FOR_PREVIEW, api, id, isPreview, mounted]);

	return (
    <div className="relative w-full h-full">
      {/* <div className="absolute flex flex-col gap-1 max-w-[100px] top-0 left-0 bg-black bg-opacity-75 text-white p-3 rounded-lg z-10">
          <div>ID: {id}</div>
          <div>Source: {source}</div>
          <div>Link Upload Version: {linkUploadVersion}</div>
      </div> */}
      <PageLink id={id} html={html} isPreview={isPreview} />
    </div>
  );
};
