import { Separator } from "@radix-ui/themes";
import { cn } from "@/utils";

const LinearGradientTest = () => {
  const colors = ['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'];
  return (
    <div className="w-auto h-auto flex flex-col items-start justify-center p-10">
      <div className={cn(`flex items-center gap-2`)}>
        <div className={cn(`[background-image:linear-gradient(to_right,${colors.join(',')})] w-[200px] h-[20px]`)} />
        <div className={cn(`text-xs`)}>CSS Linear Gradient</div>
      </div>
      <div className={cn(`flex items-center gap-2`)}>
        <svg width="200" height="20"> <defs> <linearGradient id={`test-svg-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">{colors.map((color: string, index: number) => (<stop key={index} offset={`${index * 100 / (colors.length - 1)}%`} stopColor={color} />))}</linearGradient></defs><rect width="200" height="20" fill="url(#test-svg-gradient)" /></svg>
        <div className={cn(`text-xs`)}>SVG Linear Gradient with color stops</div>
      </div>
    </div>
  )
};

const Test = ({ test }: any) => {
  return (
    <>
      {test}
      <Separator orientation="horizontal" size="4" />
    </>
  )
}

const TestPage = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <h1 className="text-2xl font-bold flex w-full justify-center p-2">Test Page</h1>
      <Separator orientation="horizontal" size="4" />
      <div className="flex flex-col items-center justify-center gap-1">
        <Test test={<LinearGradientTest />} />
      </div>
    </div>
  )
}
export default TestPage;