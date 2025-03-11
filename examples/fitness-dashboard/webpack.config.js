const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// cspell:disable-next-line
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
require('dotenv').config();

const isProduction = process.env.NODE_ENV == 'production';
const API_SOURCE_TYPE = process.env.API_SOURCE_TYPE;

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

// Comments on HMR for React:
// https://github.com/gaearon/react-hot-loader/issues/1150

const publicEnvironmentVariables = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDERID',
  'FIREBASE_APP_ID',
];

const config = {
  entry: ['./src/index.tsx'],
  output: {
    path: OUTPUT_PATH,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    clean: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
    client: {
      logging: 'verbose',
    },
  },
  devtool: isProduction ? 'source-map' : 'eval',
  optimization: {
    // Remove License.txt files from the ./dist/
    // https://github.com/webpack-contrib/terser-webpack-plugin#remove-comments
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    // Make a module's hash stay consistent between builds, unless its content
    // has changed
    moduleIds: 'deterministic',
    // https://webpack.js.org/configuration/optimization/#optimizationmangleexports
    // https://webpack.js.org/blog/2020-10-10-webpack-5-release/#deterministic-chunk-module-ids-and-export-names
    // Keep original export names
    mangleExports: false,
    // Creates a single runtime bundle for all chunks
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          // Controls which modules are selected by this cache group
          test(module) {
            const absPath = module.resource;
            return (
              absPath && (absPath.includes('@nivo') || absPath.includes('d3'))
            );
          },
          name: 'charts',
          // `all` means that chunks can be shared even between async and
          // non-async chunks. In other words, include all types of chunks.
          chunks: 'all',
          // If the current chunk contains modules already split out from the
          // main bundle, it will be reused instead of a new one being
          // generated
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin(publicEnvironmentVariables),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),

    new webpack.ids.HashedModuleIdsPlugin({
      context: __dirname,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),

    new webpack.NormalModuleReplacementPlugin(
      /\.\/sources\/firebase/,
      function (resource) {
        if (!API_SOURCE_TYPE) {
          return;
        }

        resource.request = resource.request.replace(
          /\.\/sources\/firebase/,
          `${API_SOURCE_TYPE}`,
        );
      },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'babel-loader',
        exclude: ['/node_modules/'],
        options: {
          plugins: isProduction ? [] : [require.resolve('react-refresh/babel')],
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@apis': path.resolve(__dirname, './src/apis'),
      // workaround for a react-router bug that can lead to multiple react-router versions
      // being installed across the main package and dependencies that list react-router as a peer dependency
      // https://github.com/remix-run/react-router/issues/12785
      'react-router-dom': path.resolve(
        __dirname,
        './node_modules/react-router-dom/dist/index.mjs',
      ),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
    config.plugins.unshift(new ReactRefreshWebpackPlugin());
  }

  return config;
};
