import * as ProgressPrimitive from '@radix-ui/react-progress';

export interface ProgressProps extends ProgressPrimitive.ProgressProps {
  className?: string;
  progress?: number;
  total?: number;
}
export const Progress = (props: ProgressProps) => {
  const { className, progress = 0, total = 100, ...rest } = props;
  return (
    <ProgressPrimitive.Root className="relative overflow-hidden bg-blackA6 rounded-full w-[300px] h-[25px]" style={{ transform: 'translateZ(0)' }} value={progress} max={total} {...rest}>
      <ProgressPrimitive.Indicator className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]" style={{ transform: `translateX(-${100 - progress}%)` }} />
      <div className="text-primary w-auto flex items-center justify-center">{progress?.toFixed(2)}%</div>/<div className="text-primary w-auto flex items-center justify-center">{total?.toFixed(2)}%</div>
    </ProgressPrimitive.Root>
  );
};
