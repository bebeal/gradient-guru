'use client';

import React from 'react';
import { ShowObject } from '@/components/Primitives/ShowObject';
import { useKeyLogger } from '@/hooks/useKeyLogger';

const KeyLoggerPage: React.FC = () => {
  const keylogger = useKeyLogger({
    maxToasts: 5,
  });

  return (
    <div className="flex flex-row gap-10 w-full h-full items-center">
      <ShowObject object={keylogger.config} />
      <div className="flex flex-col items-center justify-center h-full bg-primary text-primary text-lg">{keylogger.streamToasts()}</div>
    </div>
  );
};

export default KeyLoggerPage;
