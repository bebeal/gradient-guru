import type { Config } from 'jest';
import nextJest from 'next/jest'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    "<rootDir>/packages/",
    "<rootDir>/assets/",
  ],
};
 
// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
async function jestConfig() {
  const nextJestConfig: any = await createJestConfig(config)();
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!nanoid)/';
  return nextJestConfig;
};

export default jestConfig;
