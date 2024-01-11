'use client'

import ComeAndTakeIt from '@/assets/images/come-and-take-it.jpeg';

const ComeAndTakeItMemePage = () => {

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/2 h-1/2 flex justify-center items-center">
      <img
        src={ComeAndTakeIt.src}
        alt="Make a Game Preview"
        className="object-fit rounded-lg border border-primary w-full h-full flex"
      />
      </div>
    </div>
  )
};

export default ComeAndTakeItMemePage;
