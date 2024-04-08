import type { Config } from 'jest';
import nextJest from 'next/jest';
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
 
// Add any custom config to be passed to Jest
const config: Config = {
  fakeTimers: {
    enableGlobally: true,
  },
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(tsx|jsx|ts|js|mjs)?$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						syntax: 'typescript',
						dynamicImport: true,
						decorators: true,
					},
					transform: {
						legacyDecorator: true,
						decoratorMetadata: true,
						react: {
							runtime: 'automatic',
						},
					},
				},
			},
		],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // mocks for mdx-js
    'estree-walker': '<rootDir>/__tests__/mocks/estree-walker.ts',
    'periscopic': '<rootDir>/__tests__/mocks/periscopic.ts',
    // mocks for next-auth
    '@/utils/auth': '<rootDir>/__tests__/mocks/auth.ts',
		'next-auth/providers/credentials':
			'<rootDir>/__tests__/mocks/next-auth-providers-credentials.ts',
		'next-auth': '<rootDir>/__tests__/mocks/next-auth.ts',
  },
  testPathIgnorePatterns: [
    '^.+\\.*.css$',
    '<rootDir>/app/',
    "<rootDir>/packages/",
    '<rootDir>/dist',
		'<rootDir>/.tsbuild',
  ],
};
 
// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
const jestConfig = async () => {
  const nextJestConfig: any = await createJestConfig(config)();
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!(nanoid||nanoevents))/';
  return nextJestConfig;
}

export default jestConfig;
