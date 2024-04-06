'use client';

import { Demo } from '@/components';
import X from '@/assets/images/X.png';
import { cn } from '@/utils';


const DemoPage = () => {
  const demos = [
    {
      preview: (
        <img
          src={X.src}
          alt="Tweet Demo"
          className="object-cover rounded-lg border border-primary w-full h-full flex"
        />
      ),
      title: 'Tweet Demo',
      pinTitle: 'Click to open in new tab',
      description: 'Example of a Tweet component that fetches a tweet by ID',
      link: `/demos/tweet-demo`,
    },
  ];

  return (
    <div className={cn(`flex flex-col justify-center items-center w-full h-full gap-5 overflow-auto`)}>
      <div className={cn(`flex w-auto h-full justify-center items-center gap-4 flex-wrap overflow-auto p-10`)}>
        {demos.map((demo, index) => (
          <Demo key={`demo-${index}`} content={demo.preview} title={demo.title} pinTitle={demo?.pinTitle || demo?.title} description={demo.description} href={demo.link} />
        ))}
      </div>
    </div>
  );
};

export default DemoPage;
