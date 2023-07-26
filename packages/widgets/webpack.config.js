/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const config = {
  entry: ['./src/index.ts'],
  output: {
    path: OUTPUT_PATH,
    filename: 'index.js',
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    clean: true,
    library: {
      name: 'SSAWidgets',
      type: 'umd',
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    '@emotion/core': '@emotion/core',
    '@emotion/css': '@emotion/css',
    '@emotion/react': '@emotion/react',
    '@emotion/styled': '@emotion/styled',
    '@nivo/core': '@nivo/core',
    '@nivo/line': '@nivo/line',
    '@nivo/pie': '@nivo/pie',
    '@nivo/scales': '@nivo/scales',
  },
  // experiments: { outputModule: true },
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
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
