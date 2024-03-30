import { GithubProfile } from "next-auth/providers/github";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import { getEnvVariables } from "@/utils/environment";

export const GithubAuth = getEnvVariables({
  clientId: 'GITHUB_CLIENT_ID',
  clientSecret: 'GITHUB_CLIENT_SECRET',
}) as OAuthUserConfig<GithubProfile>;
