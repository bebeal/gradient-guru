import { Select } from '@/components/Primitives/Select';

const SelectPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex justify-center gap-2 w-[300px] h-auto p-4 border border-primary">
        <Select className="text-xs" items={['one', 'two', 'three']} />
      </div>
    </div>
  );
};

export default SelectPage;
