'use client'

import { SharedPreviewNode } from '@/components';
import { useParams, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';

const ShareNodePage = () => {
  // Route -> /share-node/[id]
  // URL -> /share-node/c6kq7nq_
  // `params` -> { id: 'c6kq7nq_' }
  const { id } = useParams<{ id: string }>();
  const searchParams  = useSearchParams();
  const preview = Boolean(searchParams?.get('preview'));
  const version = parseInt(searchParams?.get('version') || '0');

  // useEffect(() => {
  //   // set url param
  //   const url = new URL(window.location.href);
  //   url.searchParams.set('preview', preview.toString());
  //   url.searchParams.set('version', version.toString());
  //   window.history.replaceState({}, '', url.toString());
  // }, [preview, version]);
  
  return (
    <div className={`flex flex-col justify-center items-center w-full h-full overflow-auto`}>
      <SharedPreviewNode id={id} version={version} preview={preview} />
    </div>
  );
};

export default ShareNodePage;
