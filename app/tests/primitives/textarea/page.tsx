'use client';

import { useState } from 'react';
import { TextArea } from '@/components';

const TextAreaPage = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2">
      <div className="flex flex-col w-auto h-auto justify-center items-center p-10">
        <TextArea value={value} onChange={(e: any) => setValue(e.target.value)} placeholder={'Type a message...'} />
      </div>
    </div>
  );
};

export default TextAreaPage;
