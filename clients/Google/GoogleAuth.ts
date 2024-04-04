
import { GoogleProfile } from "next-auth/providers/google";
import { OAuth2Config } from "next-auth/providers";
import { getEnvVariable, getEnvVariables } from "@/utils/environment";

export const getGoogleAuth = () => {
  return getEnvVariables({
    clientId: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    redirectUri: 'GOOGLE_REDIRECT_URI',
  }) as OAuth2Config<GoogleProfile>;
};

export const getGoogleDriveAPIKey = () => getEnvVariable('GOOGLE_DRIVE_API_KEY');

export const GoogleAuth = {
  ...getGoogleAuth(),
  allowDangerousEmailAccountLinking: true,
  apiKey: getGoogleDriveAPIKey(),
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
