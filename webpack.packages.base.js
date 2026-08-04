const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
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
  devtool: isProduction ? false : 'eval',
  cache: {
    type: 'filesystem',
  },
  optimization: {
    minimize: false,
    // Do not substitute `process.env.NODE_ENV` at library-build time.
    //
    // These packages are always built with `--mode=production`, and webpack's
    // default (`optimization.nodeEnv = mode`) DefinePlugins that value into the
    // output. Every `if (process.env.NODE_ENV === 'production')` guard in the
    // kit therefore shipped as `if (true)` — which quietly compiled the whole
    // deprecation-warning mechanism, and any other dev-only diagnostic, out of
    // the published bundle while it kept working in this repo's own tests.
    //
    // Leaving it unresolved defers the decision to the consumer's bundler,
    // which is the only place that knows whether *their* build is a dev one.
    // Read it through `isDevEnvironment()` (src/utils/environment.ts), which
    // guards against runtimes with no `process` at all.
    nodeEnv: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'babel-loader',
        exclude: ['/node_modules/'],
        options: {
          configFile: '../../babel.config.js',
          cacheDirectory: true,
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    fullySpecified: false,
  },
  stats: {
    errorDetails: true,
  },
  externals: [nodeExternals()],
};

const isNotNilOrEmpty = R.compose(R.not, R.either(R.isNil, R.isEmpty));

/**
 * Turns a UMD config into an equivalent ESM one.
 *
 * The UMD build emits `require('react-hook-form')`. Under Vite the consumer
 * loads react-hook-form as ESM, so that require produced a *second* module
 * instance — the FormProvider context was written to one copy and read from the
 * other, which is why `useFormContext()` returned null and the README had to
 * tell consumers to alias react-hook-form to its CJS build. Emitting real ESM
 * lets the bundler dedupe to a single instance, so no alias is needed.
 *
 * Notes:
 * - `externals` is regenerated with `importType: 'module'`. Setting
 *   `externalsType: 'module'` alone is not enough: webpack-node-externals
 *   hard-codes `commonjs` into the strings it returns, so the ESM bundle would
 *   still emit `require('react-hook-form')` and reproduce the original bug.
 * - `clean` is disabled on both passes by the caller; see below.
 * - `cache.name` is set per pass by the caller. Webpack derives the default
 *   from the config name and mode, which are identical here, so both passes
 *   would otherwise share one filesystem cache directory while disagreeing
 *   about `externals` and `output.module` — the warm-cache route back to
 *   `require('react-hook-form')` in the ESM bundle.
 */
const toEsmConfig = (umdConfig, externalsAllowlist) =>
  R.compose(
    R.assoc('experiments', { ...umdConfig.experiments, outputModule: true }),
    R.assoc('externalsType', 'module'),
    R.assoc('externals', [
      nodeExternals({
        importType: 'module',
        ...(isNotNilOrEmpty(externalsAllowlist)
          ? { allowlist: externalsAllowlist }
          : {}),
      }),
    ]),
    R.assocPath(['output', 'module'], true),
    R.assocPath(['output', 'clean'], false),
    R.assocPath(['output', 'filename'], 'index.mjs'),
    R.assocPath(['output', 'library'], { type: 'module' }),
    R.assocPath(['output', 'chunkFormat'], 'module'),
  )(umdConfig);

module.exports = ({
  libraryName,
  outputPath,
  externals = null,
  alias = {},
  extraConfig = {},
  tsConfigPath = './tsconfig.build.json',
  /**
   * Emit an ESM bundle (`index.mjs`) alongside the UMD one. Opt-in so that
   * app-shaped packages, which nothing imports, keep a single-pass build.
   */
  dualOutput = false,
  /**
   * Packages to bundle rather than externalise. Needed as data (not just baked
   * into `externals`) so the ESM pass can rebuild its own module-type externals
   * from the same list.
   */
  externalsAllowlist = null,
}) => {
  let config = R.compose(
    R.mergeLeft(extraConfig),
    R.when(
      R.always(isNotNilOrEmpty(externals)),
      R.assoc('externals', externals),
    ),
    R.assoc('plugins', [
      new ForkTsCheckerWebpackPlugin({
        typescript: { configFile: tsConfigPath },
      }),
    ]),
    R.assoc('mode', isProduction ? 'production' : 'development'),
    R.assocPath(['resolve', 'alias'], alias),
    R.assocPath(['output', 'path'], outputPath),
    R.assocPath(['output', 'library', 'name'], libraryName),
  )(baseConfig);

  if (!dualOutput) {
    return config;
  }

  // Neither pass may clean: webpack runs multi-configs in parallel and both
  // share an output directory, so whichever finishes second would delete the
  // other's bundle. Dual-output packages call scripts/clean.mjs from their
  // build script instead, which wipes dist once up front.
  //
  // The two passes must also not share a filesystem cache. Webpack names the
  // default cache after the config's `name` and `mode`, both identical here, so
  // without an explicit name the UMD and ESM passes read and write one cache
  // directory while disagreeing about `externals` (`commonjs` vs `module`) and
  // `output.module`. A cold build is fine; a warm one can serve UMD-shaped
  // modules to the ESM pass and put `require('react-hook-form')` back in
  // index.mjs — the exact bug the ESM bundle exists to fix.
  const umdConfig = R.compose(
    R.assocPath(['cache', 'name'], `${libraryName}-umd`),
    R.assocPath(['output', 'clean'], false),
  )(config);

  // Type-check once, in the UMD pass only — both passes compile the same
  // sources, so a second ForkTsChecker would just duplicate the work and
  // report every error twice.
  const esmConfig = R.compose(
    R.assocPath(['cache', 'name'], `${libraryName}-esm`),
    R.assoc('plugins', []),
  )(toEsmConfig(umdConfig, externalsAllowlist));

  return [umdConfig, esmConfig];
};
