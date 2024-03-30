import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions as NextAuthConfig } from 'next-auth';
import NextAuth, { getServerSession } from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Logo from '@/public/favicon.ico';
import { getEnvVariables, isDevEnv } from '@/utils';
import { GoogleAuth } from './Google/GoogleAuth';
import { GithubAuth } from './Github/GithubAuth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const getNextAuth = (): any => {
  return getEnvVariables({
    secret: 'NEXTAUTH_SECRET',
    url: 'NEXTAUTH_URL',
  });
};

// OAuth Providers
export const providers: any = [
  ...(GoogleAuth ? [GoogleProvider(GoogleAuth)] : []),
  ...(GithubAuth ? [GithubProvider(GithubAuth)] : []),
];

export const nextAuthConfig = {
  theme: {
    logo: Logo.src,
  },
  session: {
    strategy: 'jwt',
  },
  secret: getNextAuth().secret,
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

export const NextAuthProvider = ({ children, session }: { children: ReactNode; session?: any }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
