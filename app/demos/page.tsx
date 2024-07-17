'use client';

import { Demo, Icon } from '@/components';
import X from '@/public/images/X.png';
import { cn } from '@/utils';


const DemoPage = () => {
  const title = 'Demos';
  const demos = [
    {
      preview: (
        <div className="rounded-lg border border-primary max-w-lg w-full h-auto flex p-8">
          <Icon set="Logos" icon="GoogleDrive" className="w-full h-full" />
        </div>
      ),
      title: 'Google Drive Picker Demo',
      pinTitle: 'Click to open in new tab',
      description: '<GoogleDriveUtility> which authenticates and ingests files from google drive',
      link: `/tests/google-drive`,
    },
    {
      preview: (
        <img
          src={X.src}
          alt="Tweet Demo"
          className="object-cover rounded-lg border border-primary flex w-xl h-auto p-4"
        />
      ),
      title: 'Tweet Demo',
      pinTitle: 'Click to open in new tab',
      description: '<Tweet> which fetches tweet by ID from twitter api',
      link: `/demos/tweet-demo`,
    },
    {
      preview: (
        <div className="rounded-lg border border-primary max-w-lg w-full h-auto flex p-8 bg-slate-500">
          <Icon set="Custom" icon="ClassicPokeBall" className="w-full h-full" />
        </div>
      ),
      title: 'Pokemon DB',
      pinTitle: 'Click to open in new tab',
      description: 'Pokemon DB rendered with a highly customized ag-grid',
      link: '/tests/data-grid/pokemonDB',
    },
    {
      preview: (
        <div className="rounded-lg border border-primary max-w-lg w-full h-auto flex px-8 py-12">
          <Icon set="Custom" icon="ThreeFanGpu" className="w-full h-full" />
        </div>
      ),
      title: 'GPUs',
      pinTitle: 'Click to open in new tab',
      description: 'GPU Architecture Breakdown',
      link: '/demos/gpu',
    }
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className={cn(`flex w-auto justify-center items-center gap-2 flex-wrap p-2`)}>
        {demos.map((demo, index) => (
          <Demo key={`demo-${index}`} content={demo.preview} title={demo.title} pinTitle={demo?.pinTitle || demo?.title} description={demo.description} href={demo.link} />
        ))}
      </div>
    </div>
  );
};

export default DemoPage;
