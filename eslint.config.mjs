import js from '@eslint/js';
import globals from 'globals';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import jsxAllyPlugin from 'eslint-plugin-jsx-a11y';
import extendTypescriptESLint from 'typescript-eslint';
import { fixupConfigRules } from '@eslint/compat';
import extendReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import extendPrettier from 'eslint-plugin-prettier/recommended';
import extendStorybookConfig from 'eslint-plugin-storybook';

export default [
  {
    ignores: [
      '**/node_modules/*',
      '**/storybook-static/*',
      '**/coverage/*',
      '**/dist/*',
      '.gitignore',
      '@types',
      '**/.storybook/*',
      '**/tasks/*',
      '**/webpack.**.js',
      '**/.babelrc.js',
    ],
  },
  ...extendTypescriptESLint.configs.recommended,
  ...fixupConfigRules(extendReactRecommended),
  ...extendStorybookConfig.configs['flat/recommended'],
  // reactPlugin.configs.recommended, // need to add, when it will be ready for ESLint 9
  // extendPrettier, // need to add, when it will be ready for ESLint 9
  // reactPlugin.configs["jsx-runtime"], // need to add, when it will be ready for ESLint 9
  // jsxAllyPlugin.configs.recommended, // only plugin
  // ...fixupConfigRules(extendStorybookConfig), // need to add, when it will be ready for ESLint 9
  {
    files: [
      '**/src/**/*.js',
      '**/src/**/*.jsx',
      '**/src/**/*.ts',
      '**/src/**/*.tsx',
    ],
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
    },
  },
  {
    ...js.configs.recommended,
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...extendPrettier.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
          jsxPragma: null,
        },
      },
      globals: {
        ...globals.browser,
        es6: true,
        node: true,
        jest: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      ['@typescript-eslint']: eslintPlugin,
      typescriptParser,
      prettier: prettierPlugin,
      ['jsx-ally']: jsxAllyPlugin,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'error',
      'require-await': 'error',
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'],
        },
      ],
      'react/prop-types': 0,
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];
