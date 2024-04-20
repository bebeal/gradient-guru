import type { Config } from 'jest';

// Add any custom config to be passed to Jest
const jestConfig: Config = {
  fakeTimers: {
    enableGlobally: true,
  },
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(tsx|jsx|ts|js|mjs|cjs)?$': [
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
    '^.+\\.svg$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!(nanoid||nanoevents))/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass|gif|png)$': 'identity-obj-proxy',
    '\\.svg$': 'jest-transform-stub',
    // mocks for mdx-js
    'estree-walker': '<rootDir>/__tests__/mocks/estree-walker.ts',
    periscopic: '<rootDir>/__tests__/mocks/periscopic.ts',
  },
  testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/.tsbuild'],
};

export default jestConfig;
