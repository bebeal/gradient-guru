'use client'

import { CopyButton, DownloadButton } from "@/components";

const ButtonsPage = () => {


  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-10 overflow-auto">
        <div className="flex items-center justify-center gap-2">
          <CopyButton value="copy this" />
          <DownloadButton url="/large-dummy.txt" />
          <DownloadButton simDownload/>
          <DownloadButton simError />
        </div>
      </div>
    </div>
  )
};

export default ButtonsPage;

