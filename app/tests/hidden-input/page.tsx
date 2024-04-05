
'use client'

import { useCallback, useState } from "react";
import { HiddenInput } from "@/components";

const HiddenInputPage = () => {
  const [value, setValue] = useState<string>('')
  const onChange = useCallback((key: string) => {
    setValue(key);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary">
      <div className="flex flex-col gap-10 w-full justify-center items-center">
        <div className="flex border border-primary rounded-md p-4">
          <HiddenInput value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default HiddenInputPage;
