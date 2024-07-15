
import { CognitoProfile } from "next-auth/providers/cognito";
import { OAuth2Config } from "next-auth/providers";
import { getEnvVariables } from "@/utils/environment";

// export const CognitoAuth = getEnvVariables({
//   clientId: 'COGNITO_CLIENT_ID',
//   clientSecret: 'COGNITO_CLIENT_SECRET',
//   issuer: 'COGNITO_ISSUER',
// }) as OAuth2Config<CognitoProfile>;

export const issuer = (region: string, poolId: string) => `https://cognito-idp.${region}.amazonaws.com/${poolId}`;

export const CognitoAuth = undefined;
