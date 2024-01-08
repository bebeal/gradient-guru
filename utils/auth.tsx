import NextAuth, { NextAuthConfig } from "next-auth";
import { SessionProvider } from 'next-auth/react';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { getEnvVariable, isDevEnv } from "./host";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { ReactNode } from "react";
import Logo from '@/public/apple-touch-icon-180x180.png';

export const getGoogleAuth = (): any => {
  const clientId = getEnvVariable('GOOGLE_CLIENT_ID');
  const clientSecret = getEnvVariable('GOOGLE_CLIENT_SECRET');
  const redirectUri = getEnvVariable('GOOGLE_REDIRECT_URI');
  if (!clientId || !clientSecret || !redirectUri) {
    if (typeof window === 'undefined') {
      console.error('Google auth environment variables are missing');
    }
    return null;
  }
  // console.log('Google Auth Env Variables Found');
  return { clientId, clientSecret, redirectUri };
};

export const getGithubAuth = () => {
  const clientId = getEnvVariable('GITHUB_CLIENT_ID');
  const clientSecret = getEnvVariable('GITHUB_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    if (typeof window === 'undefined') {
      console.error('Github auth environment variables are missing');
    }
    return null;
  }
  // console.log('Github Auth Env Variables Found');
  return { clientId, clientSecret };
};

export const getNextAuth = () => {
  const secret = getEnvVariable('NEXTAUTH_SECRET');
  const url = getEnvVariable('NEXTAUTH_URL');
  if (!secret || !url) {
    if (typeof window === 'undefined') {
      console.error('NextAuth environment variables are missing');
    }
    return;
  }
  // console.log('NextAuth Secret Env Variable Found');
  return {
    secret,
    url,
  };
};

export const secret = getNextAuth()?.secret;

export const googleDriveApiKey = getEnvVariable('GOOGLE_DRIVE_API_KEY');
export const googleAuth = {
  ...getGoogleAuth(),
  allowDangerousEmailAccountLinking: true,
  apiKey: googleDriveApiKey,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
      scope: [
        'openid',
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive',
      ].join(' '),
    },
  }
};
export const githubAuth = getGithubAuth();

export const providers = [
  ...(googleAuth ? [GoogleProvider(googleAuth)] : []),
  ...(githubAuth ? [GithubProvider(githubAuth)] : []),
];

export const authConfig = {
  theme: {
    logo: Logo.src
  },
  session: {
    strategy: "jwt",
  },
  debug: isDevEnv,
  providers,
  callbacks: {
    async session({ session, token }: any) {
      if (token.account) {
        session.account = token.account;
      }
      return session
    },
    async jwt({ token, account }: any) {
      if (account) {
        token.account = account;
      }
      return token
    }
  }
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
}: any = NextAuth(authConfig);

export const getSessionServerSide = async (...args: [GetServerSidePropsContext] | [NextApiRequest, NextApiResponse] | []) => {
  return await auth(...args);
};

export const NextAuthProvider = ({
  children,
  session
}: {
  children: ReactNode;
  session?: any
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
