/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
require('dotenv').config();

const isProduction = process.env.NODE_ENV == 'production';
const API_SOURCE_TYPE = process.env.API_SOURCE_TYPE;

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

// Comments on HMR for React:
// https://github.com/gaearon/react-hot-loader/issues/1150

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
    new CopyPlugin({
      patterns: [{ from: 'public/img', to: path.resolve(OUTPUT_PATH, 'img') }],
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),

    new webpack.ids.HashedModuleIdsPlugin({
      context: __dirname,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),

    new webpack.NormalModuleReplacementPlugin(/\.\/sources\/mock/, function (
      resource,
    ) {
      if (!API_SOURCE_TYPE) {
        return;
      }

      resource.request = resource.request.replace(
        /\.\/sources\/mock/,
        `${API_SOURCE_TYPE}`,
      );
    }),
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
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@apis': path.resolve(__dirname, './src/apis'),
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
