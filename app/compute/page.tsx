'use client'

import { ThreeFanGpu } from "@/components";
import { UnderConstruction } from "@/utils";

const ComputePage = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center overflow-hidden bg-primary text-primary">
      <UnderConstruction />
      <div className="text-xl font-bold w-full flex justify-center">Compute Page</div>
      <ThreeFanGpu variant={'unique'} className="w-[400px]" />
    </div>
  )
};

export default ComputePage;
