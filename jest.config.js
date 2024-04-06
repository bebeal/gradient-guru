import nextJest from 'next/jest'
 
// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })
 
// Any custom config you want to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1"
  },
  // ignore packages directory
  testPathIgnorePatterns: [
    "<rootDir>/packages/",
  ],
}
 
// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!nanoid)/'
  return nextJestConfig
}

export default jestConfig;
