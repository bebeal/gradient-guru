'use client';

import { useParams } from 'next/navigation';
import { IconSets } from '@/components';

const SingleIconPage = () => {
  const { set, icon } = useParams<{ set: string; icon: string }>();

  const IconFromSet = IconSets?.[set].icons?.[icon] || null;

  // Handling the case where IconFromSet might not be available
  if (!IconFromSet) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full overflow-auto">
        <p>Icon not found.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-center items-center w-full h-full overflow-auto`}>
      <div className="flex flex-col justify-center items-center w-auto h-auto min-w-24 min-h-24">
        <IconFromSet width="100%" height="100%" />
      </div>
    </div>
  );
};

export default SingleIconPage;
