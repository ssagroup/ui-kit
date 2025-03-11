const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const createConfig = require('../../webpack.packages.base');

dotenv.config();

const publicEnvironmentVariables = [
  'STORYBOOK_FIREBASE_API_KEY',
  'STORYBOOK_FIREBASE_AUTH_DOMAIN',
  'STORYBOOK_FIREBASE_PROJECT_ID',
  'STORYBOOK_FIREBASE_STORAGE_BUCKET',
  'STORYBOOK_FIREBASE_MESSAGING_SENDERID',
  'STORYBOOK_FIREBASE_APP_ID',
];

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSATemplates',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@icons': path.resolve(__dirname, './src/icons'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@': path.resolve(__dirname, './src/projects'),
      '@fintech': path.resolve('./src/projects/fintech'),
      '@fitness': path.resolve('./src/projects/fitness'),
      '@hr': path.resolve('./src/projects/hr'),
    },
    extraConfig: {
      plugins: [new webpack.EnvironmentPlugin(publicEnvironmentVariables)],
    },
  });

  return currentConfig;
};
