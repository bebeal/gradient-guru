import { cn } from '@/utils/utils';

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
  const tailwindFonts = ['font-mono', 'font-argon', 'font-krypton', 'font-neon', 'font-radon', 'font-xenon'];

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto bg-primary">
      <h1 className="text-2xl font-bold justify-self-start">Fonts Showcase</h1>
      <div className="flex flex-wrap justify-center w-full gap-10 p-2">
        {tailwindFonts.map((font) => (
          <div key={font} className="flex flex-col rounded items-center justify-center w-full h-auto overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
            <code className={`text-sm font-bold`}>{font}</code>
            <FontDemos fontClassName={font} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontsPage;
