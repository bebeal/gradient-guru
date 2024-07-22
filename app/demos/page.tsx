'use client';

import { DemoCard, Icon, Kbd } from '@/components';
import X from '@/public/images/X.png';
import { cn } from '@/utils';

const DemoPage = () => {
  const title = 'Demos';
  const demos = [
    {
      preview: <Icon set="Radix" icon="Input" className="w-full h-full p-6 px-8" />,
      title: 'Auto Form',
      pinTitle: 'Click to open in new tab',
      description: 'Auto Form with react-hook-form, zod for validation',
      link: `/demos/auto-form`,
    },
    {
      preview: <Icon set="Logos" icon="GoogleDrive" className="w-full h-full p-6" />,
      title: 'Google Drive Picker',
      pinTitle: 'Click to open in new tab',
      description: '<GoogleDriveUtility> which authenticates and ingests files from google drive',
      link: `/demos/google-drive`,
    },
    {
      preview: <img src={X.src} alt="Tweet Demo" className="object-cover rounded-lg flex w-xl h-auto p-4" />,
      title: 'Tweet Component',
      pinTitle: 'Click to open in new tab',
      description: '<Tweet> which fetches tweet by ID from twitter api',
      link: `/demos/tweet-demo`,
    },
    {
      preview: (
        <div className="rounded-lg border border-primary w-full h-auto flex px-8 py-6 bg-slate-500">
          <Icon set="Custom" icon="ClassicPokeBall" className="w-full max-w-md" />
        </div>
      ),
      title: 'Pokémon DB',
      pinTitle: 'Click to open in new tab',
      description: 'Pokemon DB rendered with custom ag-grid',
      link: '/demos/data-grid/pokemonDB',
    },
    {
      preview: <Icon set="Carbon" icon="ChartMultitype" className="w-full h-full p-6 px-8" />,
      title: 'Data Visualizations',
      pinTitle: 'Click to open in new tab',
      description: 'Data Visualizations with plotly, ag-charts, D3.js', // (TODO: add D3.js, ag-charts)
      link: '/demos/data-viz',
    },
    {
      preview: (
        <div className="grid grid-cols-6 auto-rows-min gap-1 justify-items-center p-4 w-full text-sm">
          <div className="col-start-5 col-span-1">
            <Kbd>k</Kbd>
          </div>
          <div className="col-start-1 col-span-1">
            <Kbd>l</Kbd>
          </div>
          <div className="col-start-2 col-span-1">
            <Kbd>o</Kbd>
          </div>
          <div className="col-start-3 col-span-1">
            <Kbd>g</Kbd>
          </div>
          <div className="col-start-4 col-span-1">
            <Kbd>g</Kbd>
          </div>
          <div className="col-start-5 col-span-1">
            <Kbd>e</Kbd>
          </div>
          <div className="col-start-6 col-span-1">
            <Kbd>r</Kbd>
          </div>
          <div className="col-start-5 col-span-1">
            <Kbd>y</Kbd>
          </div>
        </div>
      ),
      title: 'Key Logger',
      pinTitle: 'Click to open in new tab',
      description: 'Key Logger via hook',
      link: '/demos/key-logger',
    },
    {
      preview: <Icon set="Custom" icon="ThreeFanGpu" className="w-full h-full p-4" />,
      title: 'GPUs',
      pinTitle: 'Click to open in new tab',
      description: 'GPU Architecture Breakdown',
      link: '/demos/gpu',
    },
    {
      preview: <Icon set="Logos" icon="TipTap" className="w-full h-full p-6 py-10" />,
      title: 'Rich Text Editor',
      pinTitle: 'Click to open in new tab',
      description: 'Rich Text Editor with TipTap, Katex, PrismJS, and more',
      link: '/demos/tiptap',
    }
  ];

  return (
    <div className="flex flex-col gap-2 h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className={cn(`flex w-auto justify-center items-center gap-10 flex-wrap p-2 w-4/5`)}>
        {demos.map((demo, index) => (
          <DemoCard key={`demo-${index}`} content={demo.preview} title={demo.title} pinContent={demo?.pinTitle || demo?.title} description={demo.description} href={demo.link} />
        ))}
      </div>
    </div>
  );
};

export default DemoPage;
