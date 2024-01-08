'use client'

import { useSession } from "next-auth/react"

const AuthStatus = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <div className="w-full h-full flex flex-wrap whitespace-pre break-words overflow-auto">{JSON.stringify(session, null, 2)}</div>
  )
}

const ClientSideAuthTestPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-auto h-auto flex flex-col text-xs justify-center items-center overflow-hidden">
        <h1>Protected Client Page</h1>
        <AuthStatus />
      </div>
    </div>
  );
};

export default ClientSideAuthTestPage;
