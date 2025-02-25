import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import globals from 'globals';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/node_modules',
      '**/coverage',
      '**/@types',
      '!**/babel.config.js',
      '!**/.storybook',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11Y.flatConfigs.recommended,
  storybook.configs['flat/recommended'],
  prettierRecommended,
  {
    rules: {
      // React specific rules
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/prop-types': 0,
      // Prettier specific rules
      // https://github.com/aprettier/eslint-plugin-prettier?tab=readme-ov-file#options
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      // ESLint specific rules
      // https://eslint.org/docs/latest/rules/
      'require-await': 'error',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 0,
    },
  },
);
