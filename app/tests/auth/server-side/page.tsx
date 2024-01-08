
import { getSessionServerSide } from "@/utils";

const AuthStatus = async () => {
  const session = await getSessionServerSide();

  return session ? (
      <div className="w-full h-full flex flex-wrap whitespace-pre break-words overflow-auto">{JSON.stringify(session, null, 2)}</div>
  ) : <p>Access Denied</p>;
}

const ClientSideAuthTestPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-auto h-auto flex flex-col text-xs justify-center items-center overflow-hidden">
        <h1>Protected Server Page</h1>
        <AuthStatus />
      </div>
    </div>
  );
};

export default ClientSideAuthTestPage;
