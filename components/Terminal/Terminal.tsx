'use client'

import { SyntaxHighlighter, SyntaxStyle, CodeLanguageProperties, CodeLanguageAliases, CopyButton, IconLink, DownloadButton } from "@/components";


export interface TerminalProps {
  value?: any;
  code?: string;
  language?: string;
  style?: SyntaxStyle;
}

export const Terminal = (props: TerminalProps) => {
  const { value, code='', language, style='custom', ...rest } = props;
  const id = `terminal-${language}`;
  const codeLanguage: CodeLanguageProperties = CodeLanguageAliases[language||'jsx'];

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

    const blob = new Blob([value], { type: 'text/plain' })
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
    <section id={id} className="flex flex-col h-auto w-full rounded-lg gap-0">
      <div className="bg-[#28282b] w-full h-auto leading-4 rounded-t-lg grid grid-cols-3 items-center px-4 py-[0.5px] pointer-events-auto overflow-hidden">
        <div className="flex w-auto gap-1 items-center justify-self-start">
          {codeLanguage?.icon && codeLanguage?.href && codeLanguage?.name && <IconLink Ico={codeLanguage?.icon} href={codeLanguage?.href} label={codeLanguage?.name} />}
        </div>
        <div className="text-primary font-bold text-sm justify-self-center">
          Terminal.<span className="text-muted text-xs">{codeLanguage?.extensions?.[0] || 'jsx'}</span>
        </div>
        <div className="flex w-auto gap-1 items-center justify-self-end">
          <DownloadButton onClick={downloadAsFile} simDownload />
          <CopyButton value={code} />
        </div>
      </div>
      <div className="w-full">
        <SyntaxHighlighter code={code} language={language} style={style} className={'!rounded-t-0 !rounded-b-lg'} {...rest} />
      </div>
    </section>
  );
};
Terminal.displayName = 'Terminal';