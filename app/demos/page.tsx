'use client';

import GradientGuruArchitectureSVG from '@/assets/icons/GradientGuruArchitecture.svg';
import { Demo } from '@/components';
import { cn } from '@/utils';

type DemoProps = {
  preview: React.ReactNode;
  title: string;
  description: string;
  link: string;
  credits?: string;
};

const DemoPage = () => {
  const demos = [
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
        />
      ),
      title: 'Make a UI',
      description: 'Transform wireframe sketches into real UI',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
        />
      ),
      title: 'Make a Game',
      description: 'Create interactable games',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
        />
      ),
      title: 'System Architect',
      description: 'Create system diagrams from code',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
        />
      ),
      title: 'Canvas Controller',
      description: 'Manipulate and interact on the canvas',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
        />
      ),
      title: 'AI Art',
      description: 'Generate art with AI',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
        />
      ),
      title: 'Learn Something New',
      description: 'Interactive generated educational visuals',
      link: 'https://example.com',
    },
    {
      preview: (
        <GradientGuruArchitectureSVG
          width={"100%"}
          className="rounded-lg border border-primary w-full h-auto"
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
          <Demo key={`demo-${index}`} content={demo.preview} title={demo.title} pinTitle={demo.title} description={demo.description} href={demo.link} />
        ))}
      </div>
    </div>
  );
};

export default DemoPage;