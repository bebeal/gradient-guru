'use client';

// rewritten https://github.com/bebeal/gradient-guru/tree/main/components/Random/Custom/DemoCard.tsx from original: https://ui.aceternity.com/components/3d-pin

import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';
import { useDevTools } from '@/hooks/useDevTools';
import { Loading } from '@/components/Primitives/Loading';

export interface DemoCardProps {
  title?: string;
  pinContent?: React.ReactNode | string;
  href?: string;
  description?: string;
  content?: React.ReactNode | string;
  containerClassName?: string;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, DemoCardProps>(({ ...props }, ref) => {
  const { title, description, content } = props;
  return (
    <div ref={ref} className="flex flex-col py-4 px-6 gap-2 tracking-tight text-tertiary min-w-[14rem] min-h-[5rem] relative overflow-hidden transition duration-700 rounded-lg">
      <h3 className="max-w-xs font-bold text-base text-primary h-auto">{title}</h3>
      <div className="text-base font-normal">
        <span className="text-slate-500 flex text-xs h-full">{description}</span>
      </div>
      <div className="rounded-xl border border-white/[0.2] group-hover/pin:border-white/[0.3] max-w-lg max-h-[165px] w-auto h-full flex justify-center items-center transition duration-700">
      {content ? content : <div className="flex flex-1 w-full rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 min-w-36 min-h-32" />}
      </div>
    </div>
  );
});

const Pin = ({ content }: { content?: React.ReactNode | string }) => {
  return (
    <motion.div className="w-96 h-80 pointer-events-none flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0  flex justify-center">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">{content}</span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </div>
        </div>
        <div style={{ perspective: '1000px', transform: 'rotateX(70deg) translateZ(0)' }} className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
          <>
            <motion.div initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }} animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }} transition={{ duration: 6, repeat: Infinity, delay: 0 }} className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]" ></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }} animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]" ></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }} animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }} transition={{ duration: 6, repeat: Infinity, delay: 4 }} className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]" ></motion.div>
          </>
        </div>
        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  " />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " />
        </>
      </div>
    </motion.div>
  );
};

export const DemoCard = (props: DemoCardProps) => {
  const { debug } = useDevTools();
  const { title, pinContent, href, description, content, containerClassName, className, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      setDims({
        width: ref.current.offsetWidth + 8,
        height: ref.current.offsetHeight + 40,
      });
    }
  }, [ref]);
  

  return (
    <>
    <a
      href={href}
      target="_blank"
      referrerPolicy="no-referrer"
      className={cn(
        dims.width === 0 || dims.height === 0 && 'opacity-0',
        'relative grid group/pin z-[var(--layer-toasts)] cursor-pointer overflow-visible h-auto w-auto',
        debug && 'border && border-red-500', 
        containerClassName
      )}
      style={{ width: dims.width, height: dims.height }}
      {...rest}
    >
      <div
        style={{
          perspective: '1000px',
          transform: 'rotateX(70deg) translateZ(0deg)',
        }}
        className="absolute left-1/2 top-1/2 mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2 p-0.5 flex justify-start items-start rounded-lg shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition duration-700 overflow-hidden",
            'bg-black border border-white/[0.2] group-hover/pin:border-white/[0.3]',
            /* Animation is applied here but triggered by hovering the parent */
            `[transform:translate(-50%,-50%)_rotateX(0deg)_scale(1)]`,
            `group-hover/pin:[transform:translate(-50%,-50%)_rotateX(40deg)_scale(0.8)]`
          )}
        >
          <div className={cn('relative z-[var(--layer-toasts)]', className)}>
            <Card ref={ref} {...props} />
          </div>
        </div>
      </div>
      <Pin content={pinContent} />
    </a>
    {dims.width === 0 || dims.height === 0 && <Loading />}
    </>
  );
};
