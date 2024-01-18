'use client'

import { IconSetCache } from "@/components";
import { useParams } from "next/navigation";


const SingleIconPage = () => {
  const { set, icon } = useParams<{ set: string, icon: string }>();
  
  const IconFromSet = IconSetCache[set][icon];

  return (
    <div className={`flex flex-col justify-center items-center w-full h-full overflow-auto`}>
      <div className="flex flex-col justify-center items-center w-auto h-auto min-w-24 min-h-24">
        <IconFromSet width="100%" height="100%" />
      </div>
    </div>
  )
};

export default SingleIconPage;


