'use client'

import { useEffect, useState, FC } from 'react';
import { DirectoryTree, DirectoryTreeProps } from '@/components';
import { Erroring, Loading } from '@/utils';

export interface DirectoryProps {
  initialPath: string;
};

export const Directory: FC<DirectoryProps> = ({ initialPath }) => {
  const [tree, setTree] = useState<DirectoryTreeProps | null>(null);
  const [error, setError] = useState<any>(null);
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
  
    fetch(`/api/getDirectory?dir=${initialPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) throw new Error(`API Error: ${JSON.stringify(response)}`);
      return response.json();
    }).then((data) => {
      setTree(data);
    }).catch((error) => {
      console.error(error);
      setError(error);
    });
  }, [initialPath, isMounted]);

  if (!isMounted) return <Loading />;
  if (error) return <Erroring error={error} />;

  return (
    <div className="flex flex-col w-full h-full text-base">
      {tree && <DirectoryTree {...tree} />}
    </div>
  );
};
