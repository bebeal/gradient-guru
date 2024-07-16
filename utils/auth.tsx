import { ReactNode } from 'react';
import NextAuth, { NextAuthConfig, NextAuthResult } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CognitoProvider from "next-auth/providers/cognito";
import { SessionProvider } from 'next-auth/react';
import { GithubAuth } from '@/clients/Github/GithubAuth';
import { GoogleAuth } from '@/clients/Google/GoogleAuth';
import { CognitoAuth } from '@/clients/AWS/CognitoAuth';
import Logo from '@/public/favicon.ico';
import { getEnvVariables, isDevEnv } from './environment';

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
  ...(CognitoAuth ? [CognitoProvider(CognitoAuth)] : []),
  
];

const secret = process?.env?.NEXTAUTH_SECRET

export const nextAuthConfig = {
  theme: {
    logo: Logo.src,
  },
  session: {
    strategy: 'jwt',
  },
  secret: secret,
  trustHost: !isDevEnv,
  debug: isDevEnv,
  providers,
  callbacks: {
    session: async ({ session, token }: any) => {
      if (token?.account) {
        session.account = token.account;
      }
      return session;
    },
    jwt: async ({ token, account }: any) => {
      if (account) {
        token.account = account;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
}: NextAuthResult = NextAuth(nextAuthConfig);

export const NextAuthProvider = ({ children, session }: { children: ReactNode; session?: any }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
