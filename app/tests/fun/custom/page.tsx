'use client'

import { Demo } from "@/components";

const DemoCardDemo = () => {
  return (
    <Demo
      title="Demo Title"
      description="Demo Description"
      pinTitle="Demo Pin Title"
      href="/"
    />
  )
};

const Demos: any = {
  DemoCardDemo,
}

const FunPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto overflow-auto bg-primary text-primary gap-2">
      <div className="flex flex-col gap-10 w-full h-auto justify-center items-center p-10">
        {Object.keys(Demos).map((key: any) => {
          const Component: any = Demos[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunPage;
