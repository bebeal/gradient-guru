'use client'

import { Highlighter } from "@/components/Highlighter/Highlighter";
import { cn } from "@/utils";

const FontDemo = ({ fontClassName, className }: { fontClassName: string; className?: string }) => (
  <div className={cn(`flex flex-col items-center justify-center p-1 ${fontClassName}`, className)}>
    <p className="p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    <p className={`p-1 font-bold`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    <p className={`p-1 italic`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    <p className={`p-1 font-bold italic`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
  </div>
);

// use text-sm, text-md, text-lg w/ FontDemo
const FontDemos = ({ fontClassName }: { fontClassName: string }) => (
  <div className={`flex flex-col items-center justify-center p-1 gap-2`}>
    <FontDemo fontClassName={fontClassName} className="text-sm" />
    <FontDemo fontClassName={fontClassName} className="text-md" />
    <FontDemo fontClassName={fontClassName} className="text-lg" />
  </div>
);

const FontsPage = () => {
  const tailwindFonts = [
    {
      fontClassName: "font-mono",
      name: 'Berkeley Mono',
      url: 'https://berkeleygraphics.com/typefaces/berkeley-mono/',
    },
    {
      fontClassName: "font-argon",
      name: 'Github Monaspace - Argon (Humanist sans)',
      url: 'https://monaspace.githubnext.com/#learn-more'
    },
    {
      fontClassName: "font-krypton",
      name: 'Github Monaspace - Krypton (Mechanical sans)',
      url: 'https://monaspace.githubnext.com/#learn-more'
    },
    {
      fontClassName: "font-neon",
      name: 'Github Monaspace - Neon (Neo-grotesque sans)',
      url: 'https://monaspace.githubnext.com/#learn-more'
    },
    {
      fontClassName: "font-radon",
      name: 'Github Monaspace - Radon (Handwriting)',
      url: 'https://monaspace.githubnext.com/#learn-more'
    },
    {
      fontClassName: "font-xenon",
      name: 'Github Monaspace - Xenon (Slab serif)',
      url: 'https://monaspace.githubnext.com/#learn-more'
    }
  ];

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto bg-primary">
      <h1 className="text-2xl font-bold justify-self-start">Fonts Showcase</h1>
      <div className="flex flex-wrap justify-center w-full gap-10 p-2">
        {tailwindFonts.map((font) => (
          <div key={`font-${font.fontClassName}`} className="flex flex-col rounded items-center justify-center w-full h-auto overflow-auto bg-primary text-primary gap-1 border border-primary p-2">
            <div className="flex flex-row gap-4 h-auto items-center">
              <Highlighter language={"bash"} className="font-bold">{font.fontClassName}</Highlighter>
              -
              <a key={`link-${font.url}`} href={font.url} target="_blank" rel="noopener noreferrer" className="font-bold" >{font.name}</a>
            </div>
            <FontDemos {...font} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontsPage;
