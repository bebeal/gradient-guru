export const env = process.env.NODE_ENV || process.env.NEXT_PUBLIC_ENV || 'development';
export const isDevEnv = env === 'development';
export const isDebugMode = () => isDevEnv && globalThis?.location?.search?.includes('debug');

export const isPublicEnvVariable = (key: string): boolean => {
  // fuck it, all of em
  return key.startsWith('VITE_') || key.startsWith('NEXT_PUBLIC_') || key.startsWith('REACT_APP_');
};

export const isOnClientSide = (): boolean => {
  return typeof window !== 'undefined';
};

export const getEnvVariable = (key: string): string | null => {
  // ignore client side request for non-public env variables
  if (isOnClientSide() && !isPublicEnvVariable(key)) {
    return null;
  }
  const value: string | undefined = process?.env?.[key];

  if (!value) {
    // const isClientSide = typeof window !== 'undefined';
    console.warn(`Missing environment variable: ${key}`);
    return null;
  }

  return value;
};

// Input: { Variable Name -> Environment Variable Name, ... }
// Output: { Variable Name -> Environment Variable Value, ... }
export const getEnvVariables = (envVars: Record<string, string>): Record<string, string> => {
  return Object.keys(envVars).reduce<Record<string, string>>((acc, key) => {
    if (isOnClientSide() && !isPublicEnvVariable(key)) {
      return acc;
    }
    const value = getEnvVariable(envVars[key]);
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
