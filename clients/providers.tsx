import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const NextAuthProvider = ({ children, session }: { children: ReactNode; session?: any }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
