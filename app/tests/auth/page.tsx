import { LinkList } from "@/components";

const AuthPage = () => {
  const title = 'Auth Flows';
  const pages: string[] = ['client-side', 'server-side'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/auth/" />
    </div>
  );
};

export default AuthPage;
