import { LinkList } from "@/components";
// import { isDevEnv } from "@/utils";

const AppPage = () => {
  const title = 'Root App Page';
  const pages: string[] = ['api', 'cdk', 'demos', 'about', 'privacy-policy', 'README', 'terms-of-service', 'tests'];

  // to only render certain links in dev env (note: the endpoints will still exists, just not linked to from here)
  // if (isDevEnv) {
  //   pages.push('tests');
  // }

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/" />
    </div>
  );
};

export default AppPage;
