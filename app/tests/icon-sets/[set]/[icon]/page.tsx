'use client';

import { useParams } from 'next/navigation';
import { Icon, IconSets } from '@/components';

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
