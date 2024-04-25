import { Icon } from '@/components/Primitives/Icons/Icon';

const IconPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex justify-center gap-2 w-[300px] p-4 border border-primary">
        <Icon set="Carbon" icon="Document" height="100%" />
      </div>
    </div>
  );
};

export default IconPage;
