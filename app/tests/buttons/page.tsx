'use client'

import { CopyButton, DownloadButton } from "@/components";

const ButtonsPage = () => {

  const ButtonGroup = ({children, title}: {children: React.ReactNode, title: string}) => {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-primary font-bold">{title}</div>
        <div className="flex items-center justify-center gap-2">
          {children}
        </div>
      </div>
    )
  }


  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-10">
        <ButtonGroup title="Copy">
          <CopyButton value="copy this" />
        </ButtonGroup>
        <ButtonGroup title="Download">
          <DownloadButton url="/large-dummy.txt" />
          <DownloadButton simDownload/>
          <DownloadButton simError />
        </ButtonGroup>
      </div>
    </div>
  )
};

export default ButtonsPage;

