import type { JestConfigWithTsJest } from 'ts-jest';

// NOTE: we didn't manage to configure Jest-projects setup for UI Kit Core and
// an example Dashboard. Thus, the have Jest configured locally (in the
// corresponding package.json).

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/types.ts',
    '!**/*.e2e.{ts,tsx}',
    '!**/*.spec.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!**/*.d.{ts,tsx}',
    '!**/.storybook/**',
    '!**/global-setup.ts',
    '!**/jest-setup.ts',
    '!**/jest.config.ts',
    '!./packages/**/dist/**',
    '!**/node_modules/**',
    '!./playwright.base.config.ts',
    '!./packages/**/playwright.config.ts',
    '!./packages/**/lostpixel.config.ts',
  ],
  verbose: true,
  globalSetup: '<rootDir>/global-setup.ts',
  projects: [
    {
      preset: 'ts-jest',
      displayName: 'UI Kit Core',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/packages/core/jest-setup.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: './packages/core/tsconfig.json',
            // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/babelConfig/
            babelConfig: './.babelrc.js',
          },
        ],
      },
      testMatch: [
        '<rootDir>/packages/core/src/**/*.spec.ts',
        '<rootDir>/packages/core/src/**/*.spec.tsx',
      ],
      moduleNameMapper: {
        '^@(components|themes|styles|types)/(.*)$': [
          '<rootDir>/packages/core/src/$1/$2',
          '<rootDir>/packages/core/src/$1/$2.ts',
          '<rootDir>/packages/core/src/$1/$2.tsx',
        ],
      },
      transformIgnorePatterns: ['/node_modules/'],
    },
    {
      displayName: 'UI Kit Utils',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: './packages/utils/tsconfig.json',
            babelConfig: './.babelrc.js',
          },
        ],
      },
      testMatch: [
        '<rootDir>/packages/utils/src/**/*.spec.ts',
        '<rootDir>/packages/utils/src/**/*.spec.tsx',
      ],
    },
    {
      displayName: 'UI Kit Hooks',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: './packages/hooks/tsconfig.json',
            babelConfig: './.babelrc.js',
          },
        ],
      },
      testMatch: [
        '<rootDir>/packages/hooks/src/**/*.spec.ts',
        '<rootDir>/packages/hooks/src/**/*.spec.tsx',
      ],
      moduleNameMapper: {
        '^@(hooks)/(.*)$': ['<rootDir>/packages/hooks/src/$1/$2'],
      },
    },
    {
      displayName: 'UI Kit HOCs',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: './packages/hocs/tsconfig.json',
            babelConfig: './.babelrc.js',
          },
        ],
      },
      testMatch: [
        '<rootDir>/packages/hocs/src/**/*.spec.ts',
        '<rootDir>/packages/hocs/src/**/*.spec.tsx',
      ],
      moduleNameMapper: {
        '^@(hocs)/(.*)$': ['<rootDir>/packages/hocs/src/$1/$2'],
      },
    },
    {
      preset: 'ts-jest',
      displayName: 'UI Kit Widgets',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/packages/widgets/jest-setup.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: './packages/widgets/tsconfig.json',
            babelConfig: './.babelrc.js',
          },
        ],
      },
      testMatch: [
        '<rootDir>/packages/widgets/src/**/*.spec.ts',
        '<rootDir>/packages/widgets/src/**/*.spec.tsx',
      ],
      moduleNameMapper: {
        '^@(apis|components)/(.*)$': [
          '<rootDir>/packages/widgets/src/$1/$2',
          '<rootDir>/packages/widgets/src/$1/$2.ts',
          '<rootDir>/packages/widgets/src/$1/$2.tsx',
        ],
      },
      transformIgnorePatterns: ['/node_modules/'],
    },
    {
      preset: 'ts-jest',
      displayName: 'Examples: Fitness Dashboard',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: [
        '<rootDir>/examples/fitness-dashboard/jest-setup.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: './examples/fitness-dashboard/tsconfig.json',
            babelConfig: './.babelrc.js',
          },
        ],
      },
      testMatch: [
        '<rootDir>/examples/fitness-dashboard/src/**/*.spec.ts',
        '<rootDir>/examples/fitness-dashboard/src/**/*.spec.tsx',
      ],
      moduleNameMapper: {
        '^@(apis|hooks|components)/(.*)$': [
          '<rootDir>/examples/fitness-dashboard/src/$1/$2',
          '<rootDir>/examples/fitness-dashboard/src/$1/$2.ts',
          '<rootDir>/examples/fitness-dashboard/src/$1/$2.tsx',
        ],
      },
      transformIgnorePatterns: ['/node_modules/'],
    },
  ],
};

export default config;
