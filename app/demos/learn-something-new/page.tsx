'use client'

import { Flow } from "@/components";
import { initialNodes } from './initialNodes';

const LearnSomethingNeweDemo = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Flow initialShapes={initialNodes as any} />
    </div>
  )
};

export default LearnSomethingNeweDemo;
