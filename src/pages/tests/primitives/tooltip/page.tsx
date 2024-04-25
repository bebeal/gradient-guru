import { useCallback, useState } from 'react';
import { HoverCard } from '@/components/Primitives/HoverCard';
import { Tooltip } from '@/components/Primitives/Tooltip';

const TooltipPage = () => {
  const [content, setContent] = useState<number>(1);

  const onClick = useCallback((event: any) => {
    event.preventDefault();
    setContent((prev: number) => prev + 1);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-2">
          <Tooltip content={content}>
            <button onClick={onClick} className="w-auto h-auto justify-center items-center">
              Test
            </button>
          </Tooltip>
        </div>
        <div className="flex items-center justify-center gap-2">
          <HoverCard content={content}>
            <button onClick={onClick} className="w-auto h-auto justify-center items-center">
              Test
            </button>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default TooltipPage;
