
export const env = process.env.NODE_ENV || process.env.NEXT_PUBLIC_NODE_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';
export const isDevEnv = env === 'development';
export const isProdEnv = env === 'production';
export const PROTOCOL = isDevEnv ? 'http://' : 'https://';
export const PORT = '3407';

export const LINK_HOST = {
	production: 'gradient-guru.com/share',
  test: '',
	development: `localhost:${PORT}/share`,
}[env];

export const APP_HOST = {
	production: 'gradient-guru.com',
  test: '',
	development: `localhost:${PORT}`
}[env];

export const getEnvVariable = (key: string, nextPublic: boolean = false): string | null => {
  const value = nextPublic ? process.env[`NEXT_PUBLIC_${key}`] : process.env[key];
  // if (!value) {
  //   console.warn(
  //     `Missing ${nextPublic ? 'NEXT_PUBLIC_' : ''}${key} environment variable`
  //   )
  //   return null;
  // }
  return value!;
}
