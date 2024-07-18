'use client';

import { DirectoryTree, Icon, LinkList } from "@/components";
// import { isDevEnv } from "@/utils";

const AppPage = () => {
  const pages = {
    './': ['api', 'demos', 'tests'],
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="flex border border-primary rounded-md p-4 h-auto min-w-[300px]">
        <DirectoryTree data={pages} basePath="./" />
      </div>
      <Icon set="Carbon" icon="ChevronDown" className="h-4 w-4 mr-1 hidden" />
      <Icon set="Carbon" icon="ChevronRight" className="h-4 w-4 mr-1 hidden"  />
      <Icon set="Custom" icon="File" className="hidden" />
      <Icon set="Custom" icon="Folder" className="hidden" />
    </div>
  );
};

export default AppPage;
