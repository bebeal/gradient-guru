'use client';

import { Demo } from '@/components';
import { APP_HOST, PROTOCOL, cn } from '@/utils';
import MakeAGamePng from '@/assets/images/make-a-game.png';


const DemoPage = () => {
  const demos = [
    // {
    //   preview: (
    //     <GradientGuruArchitectureSVG
    //       width={"100%"}
    //       className="rounded-lg border border-primary w-full h-auto"
    //     />
    //   ),
    //   title: 'Make a UI',
    //   description: 'Transform wireframe sketches into real UI',
    //   link: 'https://example.com',
    // },
    {
      preview: (
        <img
          src={MakeAGamePng.src}
          alt="Make a Game Preview"
          className="object-cover rounded-lg border border-primary w-full h-full flex"
        />
      ),
      title: 'Make a Game',
      description: 'Create interactable games',
      link: `${PROTOCOL}${APP_HOST}/demos/make-a-game`,
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