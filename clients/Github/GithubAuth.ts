import { GitHubProfile } from "next-auth/providers/github";
import { OAuth2Config } from "next-auth/providers";
import { getEnvVariables } from "@/utils/environment";

export const GithubAuth = getEnvVariables({
  clientId: 'GITHUB_CLIENT_ID',
  clientSecret: 'GITHUB_CLIENT_SECRET',
}) as OAuth2Config<GitHubProfile>;
