/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const R = require('ramda');

const isProduction = process.env.NODE_ENV == 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const baseConfig = {
  entry: ['./src/index.ts'],
  output: {
    path: OUTPUT_PATH,
    filename: 'index.js',
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    clean: true,
    library: {
      type: 'umd',
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'babel-loader',
        exclude: ['/node_modules/'],
        options: {
          configFile: '../../.babelrc.js',
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
  },
  stats: {
    errorDetails: true,
  },
};

module.exports = ({
  libraryName,
  externals = {},
  alias = {},
  extraConfig = {},
}) => {
  const config = R.compose(
    R.mergeLeft(extraConfig),
    R.assoc('mode', isProduction ? 'production' : 'development'),
    R.assoc('externals', externals),
    R.assocPath(['resolve', 'alias'], alias),
    R.assocPath(['output', 'library', 'name'], libraryName),
  )(baseConfig);

  return config;
};
