"use client";

import { Erroring } from "@/components";
import { useApi } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { renderToStaticMarkup } from "next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.production";

export const InvalidIdFallbackHtml = (
  title: string = "Invalid Link",
  message: string = "This link is invalid or has expired.",
) => {
  const ErrorPage = renderToStaticMarkup(
    <div className="flex flex-col justify-center items-center w-full h-screen gap-5 overflow-auto bg-[#1f1f1f] text-red-500">
      <Erroring error={{ title, message }} />
    </div>,
  );
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
  </head>
  <body>
    ${ErrorPage}
  </body>
</html>`;
};

const SCRIPT_TO_INJECT_FOR_PREVIEW = (id: string | undefined) => {
  return `
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"></script>
    <script>
    // send alert messages to the parent window
    window.alert = function(message) {
      window.parent.postMessage({ type: 'iframe-alert', message: message }, '*');
    };

    // send the screenshot to the parent window
    window.addEventListener('message', function(event) {
      if (event.data.action === 'take-screenshot' && event.data.nodeid === "node:${id}") {
        htmlToImage.toPng(document.body, { quality: 1, cacheBust: true }).then(dataUrl => {
          window.parent.parent.postMessage({screenshot: dataUrl, nodeid: "node:${id}"}, "*");
        });
      }
    }, false);

    // and prevent the user from pinch-zooming into the iframe
    document.body.addEventListener('wheel', e => {
        if (!e.ctrlKey) return;
        e.preventDefault();
    }, { passive: false });
    </script>
  `;
};

export interface SharedPreviewNodeProps {
  id?: string;
  version?: number;
  preview?: boolean;
}

export const SharedPreviewNode = (props: SharedPreviewNodeProps) => {
  const { id, version, preview = false, ...rest } = props;
  const [mounted, setMounted] = useState(false);
  const [html, setHtml] = useState<string>("");
  const { getS3 } = useApi();

  const injectHtml = useCallback((response: any) => {
    // Inject script just after the opening body tag
    let injectedHtml = (
      response?.html ||
      InvalidIdFallbackHtml(response?.title, response?.message)
    ).replace(/<body[^>]*>/, `$&${SCRIPT_TO_INJECT_FOR_PREVIEW(id)}`);

    // Add suppressHydrationWarning to body and html tags
    injectedHtml = injectedHtml
      .replace("<body", "<body suppressHydrationWarning")
      .replace("<html", "<html suppressHydrationWarning");

    // Remove tailwind CDN if it exists, since we already injected it
    injectedHtml = injectedHtml.replace(
      /<script.*?src="https:\/\/cdn\.tailwindcss\.com\/.*?"><\/script>\s*/g,
      "",
    );
    setHtml(injectedHtml);
  }, [id]);

  useEffect(() => {
    // listen for screenshot messages
    if (typeof window !== "undefined") {
      const windowListener = (event: MessageEvent) => {
        if (event.data.action === "take-screenshot") {
          const iframeShareNode = document.getElementById(
            `iframe-share-node-${id}-${version}`,
          ) as HTMLIFrameElement;
          iframeShareNode?.contentWindow?.postMessage(
            { action: "take-screenshot", nodeid: `node:${id}` },
            "*",
          );
        }
      };
      window.addEventListener("message", windowListener);

      return () => {
        window.removeEventListener("message", windowListener);
      };
    }
  }, [id, version]);

  useEffect(() => {
    const handleAlertMessage = (event: MessageEvent) => {
      if (event.data.type === "iframe-alert") {
        // Start the log group on the first alert and set the flag
        console.groupCollapsed(`Iframe Alert: ${event.data.message}`);
      }
    };
    window.addEventListener("message", handleAlertMessage);

    // End the log group when the component is unmounted or id changes
    return () => {
      window.removeEventListener("message", handleAlertMessage);
    };
  }, []);

  // fetch specific version of node from S3
  const fetchData = useCallback(async () => {
    if (!id) {
      console.error("No id provided");
      return;
    }
    if (version === undefined) {
      console.error("No version provided");
      return;
    }
    const response = await getS3({ id, version: version });
    injectHtml(response);
  }, [id, version, getS3, injectHtml]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      fetchData();
    }
  }, [mounted, fetchData]);

  return (
    <div className="relative w-full h-full bg-primary">
      <iframe
        id={`iframe-share-node-${id}-${version}`}
        srcDoc={html}
        draggable={false}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};
