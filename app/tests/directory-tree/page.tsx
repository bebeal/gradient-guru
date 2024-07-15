'use client'

import React from 'react';
import { DirectoryTree } from '@/components/Links/DirectoryTree';

const DirectoryTreePage: React.FC = () => {
  const apiStructure = {
    '/auth': ['/signin', '/signout'],
    '/tweet': ['/1810310734091571240'],
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary">
      <div className="flex flex-col gap-10 w-full justify-center items-center">
        <div className="flex border border-primary rounded-md p-4">
          <DirectoryTree data={apiStructure} basePath="/api" />
        </div>
      </div>
    </div>
  );
};

export default DirectoryTreePage;
