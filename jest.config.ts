import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

import type { JestConfigWithTsJest } from 'ts-jest';
import { mergeLeft } from 'ramda';

// NOTE: we didn't manage to configure Jest-projects setup for UI Kit Core and
// an example Dashboard. Thus, the have Jest configured locally (in the
// corresponding package.json).

const esm = [
  'd3-delaunay',
  'd3-interpolate',
  'd3-path',
  'd3-scale',
  'd3-shape',
  'delaunator',
  'nanoid',
  'robust-predicates',
];

type ProjectConfig = Exclude<
  Exclude<JestConfigWithTsJest['projects'], undefined>[number],
  string
>;

function defineProjectConfig(
  projectPath: string,
  projectConfig: ProjectConfig,
) {
  const baseConfig = {
    preset: 'ts-jest',
    displayName: 'UI Kit Widgets',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [] as string[],
    transform: {
      '^.+\\.[jt]sx?$': [
        'ts-jest',
        {
          tsconfig: resolve(projectPath, 'tsconfig.json'),
          babelConfig: resolve('babel.config.js'),
        },
      ],
    },
    testMatch: [
      `<rootDir>/${projectPath}/src/**/*.spec.ts`,
      `<rootDir>/${projectPath}/src/**/*.spec.tsx`,
    ],
    transformIgnorePatterns: [`node_modules/(?!.pnpm|${esm.join('|')})`],
  } satisfies JestConfigWithTsJest;

  if (existsSync(resolve(projectPath, 'jest-setup.ts'))) {
    baseConfig.setupFilesAfterEnv.push(
      `<rootDir>/${projectPath}/jest-setup.ts`,
    );
  }

  return mergeLeft(projectConfig, baseConfig);
}

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
    '!**/*.stories-extra.{ts,tsx}',
  ],
  verbose: true,
  globalSetup: '<rootDir>/global-setup.ts',
  projects: [
    defineProjectConfig('packages/utils', {
      displayName: 'UI Kit Utils',
    }),
    defineProjectConfig('packages/hooks', {
      displayName: 'UI Kit Hooks',
      moduleNameMapper: {
        '^@(hooks)/(.*)$': ['<rootDir>/packages/hooks/src/$1/$2'],
      },
    }),
    defineProjectConfig('packages/core', {
      displayName: 'UI Kit Core',
      moduleNameMapper: {
        '^@(components|themes|styles|types)$': [
          '<rootDir>/packages/core/src/index.ts',
        ],
        '^@(components|themes|styles|types)/(.*)$': [
          '<rootDir>/packages/core/src/$1/$2',
          '<rootDir>/packages/core/src/$1/$2.ts',
          '<rootDir>/packages/core/src/$1/$2.tsx',
        ],
        '^@storybook-assets/(.*)$': [
          '<rootDir>/packages/core/.storybook/assets/$1',
        ],
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/widgets', {
      displayName: 'UI Kit Widgets',
      moduleNameMapper: {
        '^@(apis|components)/(.*)$': [
          '<rootDir>/packages/widgets/src/$1/$2',
          '<rootDir>/packages/widgets/src/$1/$2.ts',
          '<rootDir>/packages/widgets/src/$1/$2.tsx',
        ],
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/templates', {
      displayName: 'UI Kit Templates',
      moduleNameMapper: {
        '^@(components|themes|styles|types)$': [
          '<rootDir>/packages/templates/src/index.ts',
        ],
        '^@(components|themes|styles|types)/(.*)$': [
          '<rootDir>/packages/templates/src/$1/$2',
          '<rootDir>/packages/templates/src/$1/$2.ts',
          '<rootDir>/packages/templates/src/$1/$2.tsx',
        ],
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/infra-dash', {
      displayName: 'UI Kit InfraDash',
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('examples/fitness-dashboard', {
      displayName: 'Examples: Fitness Dashboard',
      moduleNameMapper: {
        '^@(apis|hooks|components)/(.*)$': [
          '<rootDir>/examples/fitness-dashboard/src/$1/$2',
          '<rootDir>/examples/fitness-dashboard/src/$1/$2.ts',
          '<rootDir>/examples/fitness-dashboard/src/$1/$2.tsx',
        ],
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
  ],
};

export default config;
