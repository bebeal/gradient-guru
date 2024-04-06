'use client'

import { Separator } from "@/components";
import Image from 'next/image';
// import as asset SVG, see webpack definition in next.config.js
import GradientGruruSVG from '@/assets/icons/GradientGuruArchitecture.svg?url';
import { ImageCaption } from "@/utils";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-full gap-1 overflow-auto">
      <h1 className="font-bold text-center text-3xl">About</h1>
      <Separator />
      <div className="relative flex w-[80%] h-full p-4 overflow-hidden">
        <ImageCaption image={
        <Image
          priority
          alt='Gradient Guru Architecture'
          src={GradientGruruSVG}
          style={{
            objectFit: 'contain',
          }}
        />
        } caption='Gradient Guru Architecture' />
      </div>
    </div>
  );
};

export default AboutPage;
