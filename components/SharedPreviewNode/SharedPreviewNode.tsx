"use client";

import { Erroring, Form, Loading } from "@/components";
import { useApi } from "@/hooks";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
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
  const { id, version: initialVersion, preview = false, ...rest } = props;
  const [mounted, setMounted] = useState(false);
  const [html, setHtml] = useState<string>("");
  const [version, setVersion] = useState<number | undefined>(initialVersion);
  const [source, setSource] = useState<string>("");
  const [dateCreated, setDateCreated] = useState<any>(0);
  const [versionIds, setVersionIds] = useState<string[]>([]);
  const [versions, setVersions] = useState<any[]>([]);
  const api = useApi();

  useEffect(() => {
    if (initialVersion !== undefined) {
      setVersion(initialVersion);
    }
  }, [initialVersion]);

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
        console.log(`Iframe Alert: ${event.data.message}`);
      }
    };
    window.addEventListener("message", handleAlertMessage);

    // End the log group when the component is unmounted or id changes
    return () => {
      window.removeEventListener("message", handleAlertMessage);
    };
  }, []);

  const fetchVersions = useCallback(async () => {
    if (versions.includes(version)) return;
    const versionsArray = await api.listVersions({ id });
    // 0...n for length of versionsArray
    const versionsIndexArray = Array.from(Array(versionsArray.length).keys());
    setVersions(versionsIndexArray);
  }, [api, id, versions, version, setVersions]);

  const fetchData = useCallback(async (versionOverride?: number) => {
    if (!id) return;
    const versionToFetch =
      versionOverride !== undefined ? versionOverride : version;
    if (versionToFetch !== undefined) {
      const response = await api.getS3({ id, version: versionToFetch });
      setSource(response?.source);
      setDateCreated(response?.dateCreated);
      injectHtml(response);
    }
  }, [id, version, api, injectHtml],);

  const onChange = useCallback((data: any, e?: any) => {
    setVersion((oldVersion) => {
      const newVersion = data.version;
      if (newVersion !== oldVersion) {
        fetchData(newVersion);
      }
      return newVersion;
    });
  }, [fetchData],);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      fetchVersions();
      fetchData();
    }
  }, [mounted, fetchVersions, setMounted, fetchData]);

  const MetaDataSchema = useMemo(() => {
    const versionOptions = versions.includes(version) ? versions : [version];
    return yup.object().shape({
      id: yup.string().meta({ label: "ID", item: "readonly" }),
      version: yup
        .number()
        .oneOf(versionOptions, `Invalid Version: ${version}`)
        .meta({ item: "select", label: "Version" }),
      // source: yup.string().meta({ label: 'Source', item: 'readonly' }),
      dateCreated: yup
        .string()
        .meta({ label: "Date Created", item: "displayDate" }),
    }).meta({ item: "object" });
  }, [versions, version]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative w-full h-full bg-primary">
        <div key={`form-share-node-${id}-${version}`} className="absolute flex flex-col gap-1 max-w-[150px] top-0 left-0 text-primary font-semibold p-2 rounded z-10 text-xs flex-wrap text-pretty overflow-auto">
          <Form
            key={JSON.stringify({ id, version, source, dateCreated })}
            className="bg-primary/90"
            fieldClassName="grid-cols-1"
            object={{ id, version, source, dateCreated }}
            schema={MetaDataSchema}
            onSubmit={onChange}
          />
        </div>
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
    </Suspense>
  );
};
