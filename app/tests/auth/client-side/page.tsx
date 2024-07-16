'use client'

import { DebugAuthComponent } from "@/components";
import { useSession } from "next-auth/react"

const AuthStatus = () => {
  const session = useSession();
  return (
    <>
      <DebugAuthComponent />
      <div className="w-full h-full flex flex-wrap whitespace-pre break-words overflow-auto p-10">{JSON.stringify(session, null, 4)}</div>
    </>
  )
}

const ClientSideAuthTestPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-auto">
      <div className="w-auto h-full flex flex-col text-xs justify-center items-center overflow-hidden mt-10">
        <h1>Protected Client Page</h1>
        <div className="h-auto w-full p-4 rounded">
          <AuthStatus />
        </div>
      </div>
    </div>
  );
};

export default ClientSideAuthTestPage;
