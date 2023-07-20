module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'error',
    'require-await': 'error',
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],
  },
  ignorePatterns: [
    'node_modules',
    'coverage',
    '@types',
    '!.babelrc.js',
    '!.storybook',
  ],
};
