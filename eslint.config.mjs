import jsxA11Y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';

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
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Simple import sort rules
      // https://github.com/lydell/eslint-plugin-simple-import-sort
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Side effect imports (e.g. polyfills, global styles)
            ['^\\u0000'],
            // 2. React and React packages
            ['^react', '^@react'],
            // 3. External packages (node_modules)
            ['^[a-zA-Z0-9]'],
            // 4. Scoped external packages (e.g. @emotion/*, @reduxjs/*, etc.)
            [
              '^@(?!ssa-ui-kit|components|hooks|utils|themes|styles|apis|contexts|global-types)',
            ],
            // 5. @ssa-ui-kit/core
            ['^@ssa-ui-kit/core$'],
            // 6. @ssa-ui-kit/utils
            ['^@ssa-ui-kit/utils$'],
            // 7. @ssa-ui-kit/* (all other @ssa-ui-kit/* packages)
            ['^@ssa-ui-kit/(?!core$|utils$)'],
            // 8. Project aliases (local imports like @components, @hooks)
            [
              '^@apis',
              '^@components',
              '^@contexts',
              '^@hooks',
              '^@styles',
              '^@utils',
              '^@themes',
              '^@global-types',
              '^@/',
            ],
            ['^@/'],
            // 9. absolute imports (anything not matched above, not starting with . or @)
            ['^(?![./@])'],
            // 10. relative imports from the previous folder ../
            ['^\\../'],
            // 11. relative imports from the same folder ./
            ['^\\./'],
            // 12. *.styles
            ['^.+\\.styles$'],
            // 13. *.constants
            ['^.+\\.constants$'],
            // 14. *.types
            ['^.+\\.types$'],
            // 15. media imports
            ['^.+\\.(gif|png|svg|jpg|jpeg|webp)$'],
          ],
        },
      ],

      'simple-import-sort/exports': 'error',
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
