const nodeExternals = require('webpack-node-externals');
const R = require('ramda');

const isProduction = process.env.NODE_ENV == 'production';

const baseConfig = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'index.js',
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    clean: true,
    library: {
      type: 'umd',
    },
  },
  devtool: isProduction ? 'source-map' : 'eval',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'babel-loader',
        exclude: ['/node_modules/'],
        options: {
          configFile: '../../babel.config.js',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: { not: [/react/] }, // exclude react component if *.svg?react
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: [/react/], // include react component if *.svg?react
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  stats: {
    errorDetails: true,
  },
  externals: [nodeExternals()],
};

const isNotNilOrEmpty = R.compose(R.not, R.either(R.isNil, R.isEmpty));

module.exports = ({
  libraryName,
  outputPath,
  externals = null,
  alias = {},
  extraConfig = {},
}) => {
  let config = R.compose(
    R.mergeLeft(extraConfig),
    R.when(
      R.always(isNotNilOrEmpty(externals)),
      R.assoc('externals', externals),
    ),
    R.assoc('mode', isProduction ? 'production' : 'development'),
    R.assocPath(['resolve', 'alias'], alias),
    R.assocPath(['output', 'path'], outputPath),
    R.assocPath(['output', 'library', 'name'], libraryName),
  )(baseConfig);

  return config;
};
