'use client'

import { Highlighter, SyntaxStyle, CodeLanguageProperties, CodeLanguageAliases, CopyButton, IconLink, DownloadButton, HighlighterProps } from "@/components";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

export interface TerminalProps extends HighlighterProps {
  code: string;
  language?: string;
  syntaxStyle?: SyntaxStyle;
  editable?: boolean;
  className?: string;
}

export const Terminal = (props: TerminalProps) => {
  const { code='', language, syntaxStyle='custom', editable=false, className, ...rest } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [codeContent, setCodeContent] = useState(code);
  const id = `terminal-${language}`;
  const codeLanguage: CodeLanguageProperties = CodeLanguageAliases[language||'jsx'];

  useEffect(() => {
    setCodeContent(code);
  }, [code]);

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const fileExtension: any = codeLanguage?.extensions || '.txt'
    const suggestedFileName = `code-snippet-${Date.now()}${fileExtension}`;
    const fileName = window.prompt('Enter file name' || '', suggestedFileName)

    if (!fileName) {
      // User pressed cancel on prompt.
      return
    }

    const blob = new Blob([codeContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section id={id} className={cn("flex flex-col h-auto w-auto rounded-lg gap-0", className)}>
      <div className="bg-[#28282b] w-full h-auto leading-4 rounded-t-lg grid grid-cols-3 items-center px-4 py-[0.5px] pointer-events-auto overflow-hidden">
        <div className="flex w-auto gap-1 items-center justify-self-start">
          {codeLanguage?.icon && codeLanguage?.href && codeLanguage?.name && <IconLink Ico={codeLanguage?.icon} href={codeLanguage?.href} label={codeLanguage?.name} />}
        </div>
        <div className="text-primary font-bold text-xs justify-self-center truncate">
          Terminal.<span className="text-muted text-[10px]">{codeLanguage?.extensions?.[0] || 'jsx'}</span>
        </div>
        <div className="flex w-auto gap-1 items-center justify-self-end">
          <DownloadButton onClick={downloadAsFile} simDownload />
          <CopyButton value={codeContent} />
        </div>
      </div>
      {editable ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => textareaRef.current?.focus()}
          onClick={() => textareaRef.current?.focus()}
          className="relative flex bg-[#1e1e1e] rounded-t-0 !rounded-b-lg"
        >
          <textarea
            className="absolute inset-0 resize-none bg-transparent p-[1em] text-transparent dark:caret-white caret-black outline-none text-[12px]"
            ref={textareaRef}
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
          />
          <Highlighter code={codeContent} language={language} syntaxStyle={syntaxStyle} className={'h-full !bg-transparent !flex-1'} {...rest} />
        </div>
      ) : (
      <Highlighter code={codeContent} language={language} syntaxStyle={syntaxStyle} className={'!rounded-t-0 !rounded-b-lg h-full'} {...rest} />
      )}
    </section>
  );
};
Terminal.displayName = 'Terminal';
