import { LinkList } from '@/components/Links/LinkList';

const AssetsPage = () => {
  const title = 'Root App Page';
  const pages: string[] = ['fonts', 'icons', 'images'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/assets/" />
    </div>
  );
};

export default AssetsPage;
