import { ReactNode } from 'react';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions as NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Logo from '@/public/favicon.ico';
import { getEnvVariables, isDevEnv } from '@/utils';

export const NextAuthEnvVars = getEnvVariables({
  secret: 'NEXTAUTH_SECRET',
  url: 'NEXTAUTH_URL',
});

export const NextAuthProvider = ({ children, session }: { children: ReactNode; session?: any }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

// OAuth Providers
export const providers = [];

export const nextAuthConfig = {
  theme: {
    logo: Logo.src,
  },
  session: {
    strategy: 'jwt',
  },
  secret: NextAuthEnvVars.secret,
  debug: isDevEnv,
  providers,
  callbacks: {
    async session({ session, token }: any) {
      if (token.account) {
        session.account = token.account;
      }
      return session;
    },
    async jwt({ token, account }: any) {
      if (account) {
        token.account = account;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const handler: any = NextAuth(nextAuthConfig);

export const getSessionServerSide = async (...args: [GetServerSidePropsContext] | [NextApiRequest, NextApiResponse] | []) => {
  return await handler?.auth(...args);
};
