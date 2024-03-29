import { getEnvVariable, getEnvVariables } from "@/utils";
import { GoogleProfile } from "next-auth/providers/google";
import { OAuthUserConfig } from "next-auth/providers/oauth";

export const GoogleAuthEnvVars = getEnvVariables({
  clientId: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  redirectUri: 'GOOGLE_REDIRECT_URI',
}) as OAuthUserConfig<GoogleProfile>;


export const GoogleDriveAPIKey = getEnvVariable('GOOGLE_DRIVE_API_KEY');

export const GoogleAuth = {
  ...GoogleAuthEnvVars,
  allowDangerousEmailAccountLinking: true,
  apiKey: GoogleDriveAPIKey,
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
