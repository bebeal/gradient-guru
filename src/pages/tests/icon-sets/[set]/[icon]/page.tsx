import { useParams } from 'react-router-dom';
import { Icon } from '@/components/Primitives/Icons/Icon';

const SingleIconPage = () => {
  const { set, icon } = useParams<{ set: string; icon: string }>();

  return (
    <div className={`flex flex-col justify-center items-center w-full h-full overflow-auto`}>
      <div className="flex flex-col justify-center items-center w-auto h-auto min-w-24 min-h-24">
        <Icon set={set} icon={icon} className="w-full h-full" />
      </div>
    </div>
  );
};

export default SingleIconPage;
