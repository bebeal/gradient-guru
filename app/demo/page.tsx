'use client';

import { useState } from 'react';
import GradientGuruSVG from '@/assets/icons/GradientGuru.svg';
import { Separator } from '@/components';
import { cn } from '@/utils';

type DemoProps = {
  preview: React.ReactNode;
  title: string;
  description: string;
  link: string;
  credits?: string;
};

const AttentionGrabberPreview = (props: { hovered?: boolean; children: React.ReactNode; className?: string }) => {
  const { hovered = false, children, className } = props;
  return (
    <div
      className={cn(
        `flex justify-center items-center w-full h-auto pointer-events-none [transform-style:preserve-3d] [transform:perspective(500px)_translateZ(0px)_rotateX(0deg)_rotateY(0deg)] [filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.3))] [transition:transform_0.5s_ease-out,filter_0.5s_ease-out]`,
        hovered && `[transform:perspective(500px)_translateZ(25px)] [filter:drop-shadow(0px_4px_10px_rgba(0,0,0,0.8))]`,
        className
      )}
    >
      {children}
    </div>
  );
};

const AttentionGrabberTitle = (props: { hovered?: boolean; children: React.ReactNode; className?: string }) => {
  const { hovered = false, children, className } = props;

  return (
    <div
      className={cn(
        `flex flex-wrap justify-center items-center w-full h-auto break-words pointer-events-none [transform-style:preserve-3d] [transform:perspective(500px)_translateZ(0px)_rotateX(0deg)_rotateY(0deg)] [transition:transform_0.5s_ease-out]`,
        hovered && `[transform:perspective(500px)_translateZ(25px)] [text-shadow:2px_2px_3px_rgba(0,0,0,0.3),0_0_25px_rgba(0,0,0,0.3),0_0_10px_rgba(0,0,0,0.3)]`,
        className
      )}
    >
      {children}
    </div>
  );
};

const DemoApp = (props: DemoProps) => {
  const { preview, title, description, link } = props;
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <a
      href={link}
      className={cn('group flex flex-col items-center justify-center w-[350px] h-auto overflow-hidden rounded-lg py-1 border bg-primary border-secondary transition-all anim-duration-300 no-underline', hovered && 'border-accent')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Title */}
      <AttentionGrabberTitle hovered={hovered} className="p-2 text-center text-primary text-lg font-bold h-full">
        {title}
      </AttentionGrabberTitle>

      {/* Separator */}
      <Separator className="w-full" />

      {/* Preview */}
      <AttentionGrabberPreview hovered={hovered} className="p-2">
        {preview}
      </AttentionGrabberPreview>

      {/* Description */}
      <AttentionGrabberTitle hovered={hovered} className="px-2 text-center text-secondary text-xs font-semibold min-h-[40px]">
        {description}
      </AttentionGrabberTitle>
    </a>
  );
};

const DemoPage = () => {
  const demos = [
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'Make a UI',
      description: 'Transform wireframe sketches into real UI',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'Make a Game',
      description: 'Create interactable games',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'System Architect',
      description: 'Create system diagrams from code',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'Canvas Controller',
      description: 'Manipulate and interact on the canvas',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'AI Art',
      description: 'Generate art with AI',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'Learn Something New',
      description: 'Interactive generated educational visuals',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruSVG
          width={250}
          height={150}
          className="rounded-lg border border-primary"
        />
      ),
      title: 'Bots',
      description: 'Control a swarm of bots',
      link: 'https://example.com',
    },
  ];

  return (
    <div className={cn(`flex flex-col justify-center items-center w-full h-full gap-5 overflow-auto`)}>
      <div className={cn(`flex w-auto h-full justify-center items-center gap-4 flex-wrap overflow-auto p-10`)}>
        {demos.map((demo, index) => (
          <DemoApp key={`demo-${index}`} preview={demo.preview} title={demo.title} description={demo.description} link={demo.link} />
        ))}
      </div>
    </div>
  );
};

export default DemoPage;