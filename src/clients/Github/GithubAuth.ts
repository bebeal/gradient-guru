import { getEnvVariables } from '@/utils/environment';

export const GithubAuth = getEnvVariables({
  clientId: 'GITHUB_CLIENT_ID',
  clientSecret: 'GITHUB_CLIENT_SECRET',
});
