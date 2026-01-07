import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

import type { JestConfigWithTsJest } from 'ts-jest';
import { mergeLeft } from 'ramda';

// NOTE: we didn't manage to configure Jest-projects setup for UI Kit Core and
// an example Dashboard. Thus, the have Jest configured locally (in the
// corresponding package.json).

const esm = [
  'd3-array',
  'd3-color',
  'd3-delaunay',
  'd3-format',
  'd3-hierarchy',
  'd3-interpolate',
  'd3-path',
  'd3-scale',
  'd3-scale-chromatic',
  'd3-shape',
  'd3-time',
  'd3-time-format',
  'delaunator',
  'nanoid',
  'robust-predicates',
  'internmap', // cSpell:ignore internmap
  '@nivo/core',
  '@nivo/pie',
  '@nivo/line',
  '@nivo/radar',
  '@nivo/treemap',
  '@nivo/colors',
  '@nivo/scales',
  '@rjsf/core',
  '@rjsf/utils',
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
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'],
    },
    transform: {
      '^.+\\.[jt]sx?$': [
        'ts-jest',
        {
          tsconfig: resolve(projectPath, 'tsconfig.json'),
          babelConfig: resolve('babel.config.js'),
          isolatedModules: true,
        },
      ],
    },
    testMatch: [
      `<rootDir>/${projectPath}/src/**/*.spec.ts`,
      `<rootDir>/${projectPath}/src/**/*.spec.tsx`,
    ],
    transformIgnorePatterns: [`node_modules/(?!.*\\/?(${esm.join('|')}))`],
  } satisfies JestConfigWithTsJest;

  // Add component patch for all projects
  baseConfig.setupFilesAfterEnv.push('<rootDir>/jest-components-patch.ts');

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
    '!**/jest-global-setup.ts',
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
  globalSetup: '<rootDir>/jest-global-setup.ts',
  projects: [
    defineProjectConfig('packages/utils', {
      displayName: 'UI Kit Utils',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@components/Charts/utils/nivoReact19Compat$':
          '<rootDir>/__mocks__/@components-charts-utils.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '^@nivo/core$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/pie$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/radar$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/line$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/treemap$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/hooks', {
      displayName: 'UI Kit Hooks',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@components/Charts/utils/nivoReact19Compat$':
          '<rootDir>/__mocks__/@components-charts-utils.ts',
        '^@hooks/(.*)$': [
          '<rootDir>/packages/hooks/src/hooks/$1',
          '<rootDir>/packages/hooks/src/hooks/$1.ts',
          '<rootDir>/packages/hooks/src/hooks/$1.tsx',
        ],
        '^@ssa-ui-kit/utils$': '<rootDir>/packages/utils/src/index.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '^@nivo/core$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/pie$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/radar$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/line$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/treemap$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/core', {
      displayName: 'UI Kit Core',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@components/(.*)$': [
          '<rootDir>/packages/core/src/components/$1',
          '<rootDir>/packages/core/src/components/$1.ts',
          '<rootDir>/packages/core/src/components/$1.tsx',
        ],
        '^@components/Charts/utils/nivoReact19Compat$':
          '<rootDir>/__mocks__/@components-charts-utils.ts',
        '^@themes/(.*)$': [
          '<rootDir>/packages/core/src/themes/$1',
          '<rootDir>/packages/core/src/themes/$1.ts',
        ],
        '^@styles/(.*)$': [
          '<rootDir>/packages/core/src/styles/$1',
          '<rootDir>/packages/core/src/styles/$1.ts',
        ],
        '^@types$': '<rootDir>/packages/core/src/index.ts',
        '^@global-types/(.*)$': [
          '<rootDir>/packages/core/src/types/$1',
          '<rootDir>/packages/core/src/types/$1.ts',
          '<rootDir>/packages/core/src/types/$1.d.ts',
        ],
        '^@contexts$': '<rootDir>/packages/core/src/contexts/index',
        '^@contexts/(.*)$': [
          '<rootDir>/packages/core/src/contexts/$1',
          '<rootDir>/packages/core/src/contexts/$1.ts',
          '<rootDir>/packages/core/src/contexts/$1.tsx',
        ],
        '^@storybook-assets/(.*)$': [
          '<rootDir>/packages/core/.storybook/assets/$1',
        ],
        '^@hooks/(.*)$': [
          '<rootDir>/packages/hooks/src/hooks/$1',
          '<rootDir>/packages/hooks/src/hooks/$1.ts',
          '<rootDir>/packages/hooks/src/hooks/$1.tsx',
        ],
        '^@ssa-ui-kit/hooks$': '<rootDir>/packages/hooks/src/index.ts',
        '^@ssa-ui-kit/utils$': '<rootDir>/packages/utils/src/index.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '^@nivo/core$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/pie$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/radar$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/line$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/treemap$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/widgets', {
      displayName: 'UI Kit Widgets',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@components/Wrapper/Wrapper$': '<rootDir>/__mocks__/Wrapper.tsx',
        '^@components/Charts/utils/nivoReact19Compat$':
          '<rootDir>/__mocks__/@components-charts-utils.ts',
        // IMPORTANT: Check core components FIRST for nested imports (like @components/Label)
        // This prevents errors when jest.requireActual('@components') tries to resolve nested imports
        // The array allows fallback if not found in core
        '^@components/(.*)$': [
          '<rootDir>/packages/core/src/components/$1',
          '<rootDir>/packages/core/src/components/$1.ts',
          '<rootDir>/packages/core/src/components/$1.tsx',
          // Fallback to widgets if not found in core (for TradingInfoCard, AccountBalance, etc.)
          '<rootDir>/packages/widgets/src/components/$1',
          '<rootDir>/packages/widgets/src/components/$1.ts',
          '<rootDir>/packages/widgets/src/components/$1.tsx',
        ],
        // Then check widgets-specific APIs
        '^@apis/(.*)$': [
          '<rootDir>/packages/widgets/src/apis/$1',
          '<rootDir>/packages/widgets/src/apis/$1.ts',
          '<rootDir>/packages/widgets/src/apis/$1.tsx',
        ],
        '^@themes/(.*)$': [
          '<rootDir>/packages/core/src/themes/$1',
          '<rootDir>/packages/core/src/themes/$1.ts',
        ],
        '^@styles/(.*)$': [
          '<rootDir>/packages/core/src/styles/$1',
          '<rootDir>/packages/core/src/styles/$1.ts',
        ],
        '^@contexts$': '<rootDir>/packages/core/src/contexts/index',
        '^@contexts/(.*)$': [
          '<rootDir>/packages/core/src/contexts/$1',
          '<rootDir>/packages/core/src/contexts/$1.ts',
          '<rootDir>/packages/core/src/contexts/$1.tsx',
        ],
        '^@global-types/(.*)$': [
          '<rootDir>/packages/core/src/types/$1',
          '<rootDir>/packages/core/src/types/$1.ts',
          '<rootDir>/packages/core/src/types/$1.d.ts',
        ],
        '^@hooks/(.*)$': [
          '<rootDir>/packages/hooks/src/hooks/$1',
          '<rootDir>/packages/hooks/src/hooks/$1.ts',
          '<rootDir>/packages/hooks/src/hooks/$1.tsx',
        ],
        '^@ssa-ui-kit/core$': '<rootDir>/packages/core/src/index.ts',
        '^@ssa-ui-kit/hooks$': '<rootDir>/packages/hooks/src/index.ts',
        '^@ssa-ui-kit/utils$': '<rootDir>/packages/utils/src/index.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '^@nivo/core$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/pie$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/radar$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/line$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/treemap$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/templates', {
      displayName: 'UI Kit Templates',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@(components|themes|styles|types)$': [
          '<rootDir>/packages/templates/src/index.ts',
        ],
        '^@components/(.*)$': [
          '<rootDir>/packages/core/src/components/$1',
          '<rootDir>/packages/core/src/components/$1.ts',
          '<rootDir>/packages/core/src/components/$1.tsx',
        ],
        '^@(components|themes|styles|types)/(.*)$': [
          '<rootDir>/packages/templates/src/$1/$2',
          '<rootDir>/packages/templates/src/$1/$2.ts',
          '<rootDir>/packages/templates/src/$1/$2.tsx',
        ],
        '^@icons$': '<rootDir>/packages/templates/src/icons',
        '^@contexts$': '<rootDir>/packages/templates/src/contexts',
        '^@$': '<rootDir>/packages/templates/src/projects',
        '^@/(.*)$': '<rootDir>/packages/templates/src/projects/$1',
        '^@fintech$': '<rootDir>/packages/templates/src/projects/fintech',
        '^@fintech/(.*)$':
          '<rootDir>/packages/templates/src/projects/fintech/$1',
        '^@fitness$': '<rootDir>/packages/templates/src/projects/fitness',
        '^@fitness/(.*)$':
          '<rootDir>/packages/templates/src/projects/fitness/$1',
        '^@hr$': '<rootDir>/packages/templates/src/projects/hr',
        '^@hr/(.*)$': '<rootDir>/packages/templates/src/projects/hr/$1',
        '^@global-types/(.*)$': [
          '<rootDir>/packages/core/src/types/$1',
          '<rootDir>/packages/core/src/types/$1.ts',
          '<rootDir>/packages/core/src/types/$1.d.ts',
        ],
        '^@hooks/(.*)$': [
          '<rootDir>/packages/hooks/src/hooks/$1',
          '<rootDir>/packages/hooks/src/hooks/$1.ts',
          '<rootDir>/packages/hooks/src/hooks/$1.tsx',
        ],
        '^@ssa-ui-kit/core$': '<rootDir>/packages/core/src/index.ts',
        '^@ssa-ui-kit/widgets$': '<rootDir>/packages/widgets/src/index.ts',
        '^@ssa-ui-kit/hooks$': '<rootDir>/packages/hooks/src/index.ts',
        '^@ssa-ui-kit/utils$': '<rootDir>/packages/utils/src/index.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('packages/infra-dash', {
      displayName: 'UI Kit InfraDash',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@components/Wrapper/Wrapper$': '<rootDir>/__mocks__/Wrapper.tsx',
        '^@components/Charts/utils/nivoReact19Compat$':
          '<rootDir>/__mocks__/@components-charts-utils.ts',
        '^@components/(.*)$': [
          '<rootDir>/packages/core/src/components/$1',
          '<rootDir>/packages/core/src/components/$1.ts',
          '<rootDir>/packages/core/src/components/$1.tsx',
        ],
        '^@themes/(.*)$': [
          '<rootDir>/packages/core/src/themes/$1',
          '<rootDir>/packages/core/src/themes/$1.ts',
        ],
        '^@styles/(.*)$': [
          '<rootDir>/packages/core/src/styles/$1',
          '<rootDir>/packages/core/src/styles/$1.ts',
        ],
        '^@contexts$': '<rootDir>/packages/core/src/contexts/index',
        '^@contexts/(.*)$': [
          '<rootDir>/packages/core/src/contexts/$1',
          '<rootDir>/packages/core/src/contexts/$1.ts',
          '<rootDir>/packages/core/src/contexts/$1.tsx',
        ],
        '^@global-types/(.*)$': [
          '<rootDir>/packages/core/src/types/$1',
          '<rootDir>/packages/core/src/types/$1.ts',
          '<rootDir>/packages/core/src/types/$1.d.ts',
        ],
        '^@hooks/(.*)$': [
          '<rootDir>/packages/hooks/src/hooks/$1',
          '<rootDir>/packages/hooks/src/hooks/$1.ts',
          '<rootDir>/packages/hooks/src/hooks/$1.tsx',
        ],
        '^@ssa-ui-kit/core$': '<rootDir>/packages/core/src/index.ts',
        '^@ssa-ui-kit/hooks$': '<rootDir>/packages/hooks/src/index.ts',
        '^@ssa-ui-kit/utils$': '<rootDir>/packages/utils/src/index.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '^@nivo/core$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/pie$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/radar$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/line$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/treemap$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
    defineProjectConfig('examples/fitness-dashboard', {
      displayName: 'Examples: Fitness Dashboard',
      moduleNameMapper: {
        '^@components$': '<rootDir>/packages/core/src/components/index',
        '^@components/(.*)$': [
          '<rootDir>/packages/core/src/components/$1',
          '<rootDir>/packages/core/src/components/$1.ts',
          '<rootDir>/packages/core/src/components/$1.tsx',
        ],
        '^@(apis|hooks|components)/(.*)$': [
          '<rootDir>/examples/fitness-dashboard/src/$1/$2',
          '<rootDir>/examples/fitness-dashboard/src/$1/$2.ts',
          '<rootDir>/examples/fitness-dashboard/src/$1/$2.tsx',
        ],
        '^@global-types/(.*)$': [
          '<rootDir>/packages/core/src/types/$1',
          '<rootDir>/packages/core/src/types/$1.ts',
          '<rootDir>/packages/core/src/types/$1.d.ts',
        ],
        '^@hooks/(.*)$': [
          '<rootDir>/packages/hooks/src/hooks/$1',
          '<rootDir>/packages/hooks/src/hooks/$1.ts',
          '<rootDir>/packages/hooks/src/hooks/$1.tsx',
        ],
        '^@ssa-ui-kit/core$': '<rootDir>/packages/core/src/index.ts',
        '^@ssa-ui-kit/widgets$': '<rootDir>/packages/widgets/src/index.ts',
        '^@ssa-ui-kit/hooks$': '<rootDir>/packages/hooks/src/index.ts',
        '^@ssa-ui-kit/utils$': '<rootDir>/packages/utils/src/index.ts',
        '^d3-color$': '<rootDir>/__mocks__/d3-color.ts',
        '^@nivo/core$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/pie$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/radar$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/line$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '^@nivo/treemap$': '<rootDir>/__mocks__/@nivo-charts.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css-stub.ts',
      },
    }),
  ],
};

export default config;
