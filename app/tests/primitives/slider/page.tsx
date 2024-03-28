'use client';

import { useState } from 'react';
import { Slider } from '@/components';

const SliderPage = () => {
  const [value1, setValue1] = useState<number>(25);
  const [value2, setValue2] = useState<number>(0.25);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-2 w-[100px]">
        <Slider value={value1} onChange={(e: any) => setValue1(e.target.value)} min={0} max={100} step={1} thumbSize={10} showValue={'percent'} />
        <Slider value={value2} onChange={(e: any) => setValue2(e.target.value)} min={0} max={1} step={0.01} thumbSize={10} showValue={'value'} />
      </div>
    </div>
  );
};

export default SliderPage;
