'use client'

import { cn } from "@/utils";

export interface NeonTextProps {
  children?: any;
  className?: string;
  colors?: string[];
}

export const NeonText = (props: NeonTextProps) => {
  const {
    children,
    className,
    colors = ['blue', 'purple'],
  } = props;

  const gradientAndSpotlightClasses = cn(`absolute top-0 left-0 bottom-0 right-0 pointer-events-none`);

  return (
    <div className={cn("overflow-hidden relative [filter:contrast(110%)_brightness(190%)] bg-black p-2 h-auto w-auto", className)}>
      <div data-text={children} className={cn(
          `text-transparent w-auto h-auto text-center capitalize m-0 font-bold flex justify-center items-center`, 
          `before:content-[attr(data-text)] before:text-white before:[filter:blur(0.02em)] before:absolute before:pointer-events-none before:flex before:justify-center before:items-center before:top-0 before:left-0 before:right-0 before:bottom-0`,
          `after:content-[attr(data-text)] after:text-white after:[filter:blur(0.02em)] after:absolute after:pointer-events-none after:flex after:justify-center after:items-center after:top-0 after:left-0 after:right-0 after:bottom-0`,
          `after:[mix-blend-mode:difference]`
        )}
      >{children}</div>
      <div className={cn(gradientAndSpotlightClasses, `[mix-blend-mode:multiply]`)} style={{ background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})` }} />
      <div className={cn(gradientAndSpotlightClasses, `animate-neon-light [background:radial-gradient(circle,white,transparent_25%)_0_0_/_25%_25%,radial-gradient(circle,white,black_25%)_50%_50%_/_12.5%_12.5%] top-[-100%] left-[-100%] [mix-blend-mode:color-dodge] p-2`)} />
    </div>
  );
};
