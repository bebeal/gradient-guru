'use client'

import { motion,  useScroll, useTransform } from "framer-motion";
import { BackgroundBeams, LampContainer, PinContainer, EvervaultSvg, EvervaultCard, GoogleGeminiEffect, GlowingStarsBackgroundCard, GlowingStarsTitle, GlowingStarsDescription, SparklesCore, TextRevealCardTitle, TextRevealCard, TextRevealCardDescription, TracingBeam, TypewriterEffectSmooth, PulseBeams } from "@/components";
import { useRef } from "react";
import { mockData } from "./mockData";
import { cn } from "@/utils";
import Image from 'next/image';
import { BackgroundCellAnimation } from "@/components/Fun/Aceternity/BackgroundRipple";

const GridDemo = () => {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
};

const GridSmallDemo = () => {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
};

const DotDemo = () => {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
};

const PinDemo = () => {
  return (
    <PinContainer
        title={'3D Pin Title'}
        href={'/'}
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Title
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Description
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
    </PinContainer>
  )
};

const BackgroundBeamsDemo = () => {
  return (
    <div className="h-[400px] w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="relative z-10 text-sm  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
        Background Beams
      </h1>
      <p></p>
    </div>
    <BackgroundBeams />
  </div>
  );
};

const BackgroundRippleDemo = () => {
  return (
    <BackgroundCellAnimation />
  );
};


const EvervaultCardDemo = () => {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-auto overflow-hidden">
      <EvervaultSvg className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <EvervaultSvg className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <EvervaultSvg className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <EvervaultSvg className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="hover" />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        Hover over this card to reveal an awesome effect. Running out of copy
        here.
      </h2>
      <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        Watch me hover
      </p>
    </div>
  );
};

const GoogleGeminiEffectDemo = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400px] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-20 overflow-clip text-xs"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
};

const GlowingStarsDemo = () => {
  return (
    <div className="flex py-20 items-center justify-center antialiased">
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>Next.js 14</GlowingStarsTitle>
        <div className="flex justify-between items-end">
          <GlowingStarsDescription>
            The power of full-stack to the frontend. Read the release notes.
          </GlowingStarsDescription>
          <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
            <GlowingStarIcon />
          </div>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}

const GlowingStarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};


const LampDemo = () => {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-xs font-medium tracking-tight text-transparent"
      >
      </motion.h1>
    </LampContainer>
  );
};

const PulseBeamsDemo = () => {
  return (
    <div className="h-auto w-full relative flex flex-col items-center justify-center antialiased">
      <PulseBeams />
    </div>
  );
};

const SparklesDemo = () => {
  return (
    <div className="h-auto w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
    <h1 className="font-bold text-center text-white relative z-20">
      Aceternity
    </h1>
    <div className="w-[40rem] h-40 relative">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* Core component */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  </div>
  )
};

const TextRevealDemo = () => {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-auto rounded-2xl w-full p-4">
    <TextRevealCard
      text="You know the business"
      revealText="I know the chemistry "
    >
      <TextRevealCardTitle>
        Sometimes, you just need to see it.
      </TextRevealCardTitle>
      <TextRevealCardDescription>
        This is a text reveal card. Hover over the card to reveal the hidden
        text.
      </TextRevealCardDescription>
    </TextRevealCard>
  </div>
  )
};

const TracingBeamDemo = () => {
  return (
    <div className="flex h-auto w-full relative items-center justify-center antialiased bg-slate-950">
    <TracingBeam className="">
      <div className="w-full h-auto mx-auto antialiased pt-4 relative">
        {mockData.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={cn("text-xl mb-4")}>
              {item.title}
            </p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
    </div>
  );
};

const TypewriterEffectDemo = () => {
    const words = [
      {
        text: "Build",
      },
      {
        text: "awesome",
      },
      {
        text: "apps",
      },
      {
        text: "with",
      },
      {
        text: "Aceternity.",
        className: "text-blue-500 dark:text-blue-500",
      },
    ];
    return (
      <div className="flex flex-col items-center justify-center h-auto">
        <p className="text-neutral-600 dark:text-neutral-200 text-base  ">
          The road to freedom starts from here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex space-x-4">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Join now
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Signup
          </button>
        </div>
      </div>
    );
};

const Demos: any = {
  PinDemo,
  TypewriterEffectDemo,
  TracingBeamDemo,
  BackgroundBeamsDemo,
  BackgroundRippleDemo,
  EvervaultCardDemo,
  GoogleGeminiEffectDemo,
  GlowingStarsDemo,
  LampDemo,
  PulseBeamsDemo,
  SparklesDemo,
  TextRevealDemo,
  GridDemo,
  GridSmallDemo,
  DotDemo,
};

const FunPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto overflow-auto bg-primary text-primary gap-2">
      <div className="flex flex-col gap-10 w-full h-auto justify-center items-center p-10">
        {Object.keys(Demos).map((key: any) => {
          const Component: any = Demos[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1">
                <h1 className="text-2xl font-bold text-center">{key.replace('Demo', '')}</h1>
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunPage;
