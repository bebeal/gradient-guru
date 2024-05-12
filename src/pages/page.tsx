// import { isDevEnv } from "@/utils";

const Root = () => {
  const title = 'Root App Page';
  // const prefix = '/';
  // const pages: string[] = ['tests'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
    </div>
  );
};

export default Root;