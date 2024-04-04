
'use client'

import { Button, TipTap } from "@/components";
import { contentString } from './test';
import { markdownString } from "./markdown";
import { useCallback, useState } from "react";

const MarkdownPage = () => {
  const [content, setContent] = useState<string>(markdownString);

  const getContent = useCallback(() => {
    if (content === contentString) {
      setContent(markdownString);
    } else {
      setContent(contentString);
    }
  }, [content]);

  // safelist: hidden before:bg-[#FFF] before:bg-[#0D0D0D] before:bg-[#616161] before:bg-[#A975FF] before:bg-[#FB5151] before:bg-[#FD9170] before:bg-[#FFCB6B] before:bg-[#68CEF8] before:bg-[#80cbc4] before:bg-[#9DEF8F]
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto bg-primary text-primary gap-2">
      <Button variant="classic" className="p-2 m-2 rounded border border-primary" onClick={getContent}>Content: {content === contentString ? "Markdown" : "HTML"}</Button>
      <div className="flex flex-col gap-2 w-auto h-auto justify-center items-center overflow-hidden p-2 rounded border border-primary">
      <TipTap key={content} content={content} />
      </div>
    </div>
  );
};

export default MarkdownPage;
