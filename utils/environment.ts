export const env = process.env.NODE_ENV || process.env.NEXT_PUBLIC_ENV || 'development';
export const isDevEnv = env === 'development';
export const isDebugMode = () => isDevEnv && globalThis?.location?.search?.includes('debug');

export const isPublicEnvVariable = (key: string): boolean => {
  return key.startsWith('NEXT_PUBLIC_');
};

export const isOnClientSide = (): boolean => {
  return typeof window !== 'undefined';
};

export const getEnvVariable = (key: string): string | null => {
  // ignore client side request for non-public env variables
  if (isOnClientSide() && !isPublicEnvVariable(key)) {
    return null;
  }
  const value: string | undefined = process.env[key];

  if (!value) {
    // const isClientSide = typeof window !== 'undefined';
    console.warn(`Missing environment variable: ${key}`);
    return null;
  }

  return value;
};

// Input: { Variable Name -> Environment Variable Name, ... }
// Output: { Variable Name -> Environment Variable Value, ... }
export const getEnvVariables = (envVars: Record<string, string>): Record<string, any> => {
  return Object.keys(envVars).reduce<Record<string, any>>((acc, key) => {
    const value = process.env[envVars[key]];
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

