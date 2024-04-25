import { LinkList } from '@/components/Links/LinkList';

const DataGridsPage = () => {
  const title = 'DataGridsPage';
  // const pages: string[] = ['client-side', 'infinite', 'server-side', 'viewport'];
  const pages: string[] = ['youtube'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/primitives/" />
    </div>
  );
};

export default DataGridsPage;
