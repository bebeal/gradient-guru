import { DebugAuthComponent } from "@/components/GoogleDriveUtility/shared";
import { auth } from "@/utils/auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";


const getSessionServerSide = async (...args: [GetServerSidePropsContext] | [NextApiRequest, NextApiResponse] | []) => {
  return await auth(...(args as []));
};

const ServerSideAuthTestPage = async () => {
  const session = await getSessionServerSide();
  return (
    <div className="flex flex-col gap-2 w-full h-auto p-4 overflow-hidden items-center">
       <DebugAuthComponent />
      <h1>Protected Server Page</h1>
      <div className="w-full h-full flex flex-wrap whitespace-pre break-words overflow-auto p-10">
        {JSON.stringify(session, null, 4)}
      </div>
    </div>
  );
};

export default ServerSideAuthTestPage;
