'use client'

import { useApi } from "@/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PageLink } from "./PageLink";
import { Form, formatNodeId } from "@/components";

export interface PageId {
  id: string;
  isPreview?: boolean;
}

// Fetches the versioned ID from S3 and passes it to PageLink to render the iframe
export const PageId = (props: PageId) => {
  const { id, isPreview=false } = props;
  const [html, setHtml] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [version, setVersion] = useState<number>(0);
  const [availableVersions, setAvailableVersions] = useState<number[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
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
// catch and log alerts from the iframe
window.alert = function(e) {console.groupCollapsed('alert from iframe:', e)};
`;

  const preloadAssets = useCallback(async () => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    await loadScript("https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio");
    await loadScript("https://unpkg.com/html2canvas");
  }, []);

  const fetchData = useCallback(async () => {
    const response = await api.getS3({ id });
    const htmlFromResponse = response?.html;
    const injectedHtml = htmlFromResponse.includes('</body>')
      ? htmlFromResponse.replace('</body>', `<script>${SCRIPT_TO_INJECT_FOR_PREVIEW}</script></body>`)
      : htmlFromResponse + `<script>${SCRIPT_TO_INJECT_FOR_PREVIEW}</script>`;

    setHtml(injectedHtml);
    setSource(response?.source);
    setVersion(response?.version);
    setAvailableVersions(response?.availableVersions);
  }, [SCRIPT_TO_INJECT_FOR_PREVIEW, api, id]);

  useEffect(() => {
    const init = async () => {
      await preloadAssets();
      await fetchData();
    };

    if (!mounted) {
      setMounted(true);
      init();
    }
  }, [preloadAssets, fetchData, id, isPreview, mounted]);


	return (
    <div className="relative w-full h-full">
      <div className="absolute flex flex-col gap-1 max-w-[150px] top-0 left-0 bg-primary bg-opacity-75 text-primary font-semibold p-2 rounded z-10 text-xs flex-wrap text-pretty overflow-auto">
        <Form fieldClassName="grid-cols-1" object={{ id, source, version, availableVersions }} />
      </div>
      <PageLink id={id} html={html} isPreview={isPreview} />
    </div>
  );
};
