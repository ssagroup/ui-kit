import prettierPlugin from 'eslint-plugin-prettier';
import extendPrettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import extendReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import typescriptEslintPlugin from 'typescript-eslint';

import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import reactQuery from '@tanstack/eslint-plugin-query';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  ...fixupConfigRules(extendReactRecommended),
  {
    ignores: ['dist', '.eslintrc.cjs', '/node-modules/'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**.*.js', '**.*.jsx'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        React: true,
        ReactDOM: true,
        JSX: true,
        Plotly: 'readonly',
      },
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'react-refresh': reactRefreshPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...extendPrettier.rules,
      ...extendReactRecommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactQuery.configs.recommended.rules,
      '@/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Side effect imports at the start (e.g. polyfills, global styles)
            ['^\\u0000'],
            // 2. react and react-packages (react*, @react*)
            ['^react', '^@react'],
            // 3. all global packages (node_modules)
            ['^[a-zA-Z0-9]'],
            // 4. all other scoped packages (e.g. @nivo/colors, @emotion/*, etc.)
            ['^@(?!ssa-ui-kit)'],
            // 5. @ssa-ui-kit/core
            ['^@ssa-ui-kit/core$'],
            // 6. @ssa-ui-kit/utils
            ['^@ssa-ui-kit/utils$'],
            // 7. @ssa-ui-kit/* (all other @ssa-ui-kit/* packages)
            ['^@ssa-ui-kit/(?!core$|utils$)'],
            // 8. alias-imports, that starting from "@/"
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
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
