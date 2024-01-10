'use client'

import { useParams, useSearchParams } from 'next/navigation';
import { PageId } from '@/components';
import { cn } from '@/utils';

const ShareNodePage = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams  = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  return (
    <div className={cn(`flex flex-col justify-center items-center w-full h-full overflow-auto`)}>
      <PageId id={id} isPreview={isPreview} />
    </div>
  );
};

export default ShareNodePage;
