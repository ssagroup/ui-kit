import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  projects: [
    {
      preset: 'ts-jest',
      displayName: 'UI Kit Core',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/packages/core/jest-setup.ts'],
      transform: {
        // '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './.babelrc.js' }],
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
    },
  ],
};

export default config;
