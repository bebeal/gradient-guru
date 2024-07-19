'use client'

import { DebugAuthComponent } from "@/components/GoogleDriveUtility/shared";
import { useSession } from "next-auth/react"

const ClientSideAuthTestPage = () => {
  const session = useSession();
  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 overflow-hidden items-center">
      <DebugAuthComponent />
      <h1>Protected Client Page</h1>
      <div className="w-full h-full flex flex-wrap whitespace-pre break-words overflow-auto p-10">
        {JSON.stringify(session, null, 4)}
      </div>
    </div>
  );
};

export default ClientSideAuthTestPage;
