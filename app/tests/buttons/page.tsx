'use client'

import { CopyButton } from "@/components";

const ButtonsPage = () => {


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-2">
          <CopyButton value="copy this" />
        </div>
      </div>
    </div>
  )
};

export default ButtonsPage;

