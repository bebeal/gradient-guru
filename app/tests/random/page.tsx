import { DirectoryTree } from '@/components/Links/DirectoryTree';

const RandomPage = () => {
  const title = 'Random Components';
  const random = {
    'random/': ['aceternity', 'misc'],
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      {title && <div className="text-2xl font-bold text-center underline">{title}</div>}
      <div className="flex flex-col gap-10 w-full justify-center items-center">
        <div className="flex border border-primary rounded-md p-4 h-auto min-w-[300px]">
          <DirectoryTree data={random} />
        </div>
      </div>
    </div>
  );
};

export default RandomPage;
