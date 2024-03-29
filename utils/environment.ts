export const env = process.env.NODE_ENV || process.env.NEXT_PUBLIC_ENV || 'development';
export const isDevEnv = env === 'development';

export const getEnvVariable = (key: string): string | null => {
  const value: string | undefined = process.env[key];

  if (!value) {
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

