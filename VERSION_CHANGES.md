# Version Changes in pnpm-lock.yaml

## Summary of Package Version Updates

### Webpack & Build Tools
- **webpack**: `5.98.0` → `5.103.0`
- **webpack-dev-server**: `5.2.0` → `5.2.2`
- **html-webpack-plugin**: `5.6.3` → `5.6.5`
- **babel-loader**: (dependency updated to use webpack@5.103.0)

### Storybook (Major Update: 9.0.4 → 9.1.16)
- **storybook**: `9.0.4` → `9.1.16`
- **@storybook/addon-docs**: `9.0.4` → `9.1.16`
- **@storybook/addon-links**: `9.0.4` → `9.1.16`
- **@storybook/react-webpack5**: `9.0.4` → `9.1.16`
- **eslint-plugin-storybook**: `9.0.4` → `9.1.16`

### Babel Packages
- **@babel/plugin-transform-runtime**: `7.26.9` → `7.28.5`
- **@babel/preset-env**: `7.26.9` → `7.28.5`
- **@babel/preset-react**: `7.26.3` → `7.28.5`
- **@babel/preset-typescript**: `7.26.0` → `7.28.5`

### React & Related
- **react**: `19.2.1` → `19.2.3`
- **react-dom**: `19.2.1` → `19.2.3`
- **react-router-dom**: `7.2.0` → `7.10.1`
- **@pmmmwh/react-refresh-webpack-plugin**: `0.5.15` → `0.5.17`

### Testing Libraries
- **@playwright/test**: `1.50.1` → `1.57.0`
- **@testing-library/dom**: `10.4.0` → `10.4.1`
- **@testing-library/jest-dom**: `6.6.3` → `6.9.1`
- **@testing-library/react**: `16.2.0` → `16.3.0`
- **@testing-library/user-event**: `14.6.1` (version unchanged, but dependency updated)

### Emotion
- **@emotion/jest**: `11.13.0` → `11.14.2`

### ESLint & TypeScript ESLint
- **eslint**: `9.20.1` → `9.39.2`
- **@eslint/compat**: `1.2.6` → `1.4.1`
- **@eslint/js**: `9.20.0` → `9.39.2`
- **@typescript-eslint/eslint-plugin**: `8.24.0` → `8.49.0`
- **@typescript-eslint/parser**: `8.24.0` → `8.49.0`
- **eslint-config-prettier**: `10.0.1` → `10.1.8`
- **eslint-plugin-prettier**: `5.2.3` → `5.5.4`
- **eslint-plugin-react**: `7.37.4` → `7.37.5`

### TypeScript & Types
- **typescript**: `5.7.3` → `5.9.3` (indirect dependency)
- **@types/node**: `22.13.4` → `22.19.3`

### Other Tools
- **prettier**: `3.5.1` → `3.7.4`
- **firebase**: `11.3.1` → `11.10.0`
- **cspell**: `8.17.3` → `8.19.4`
- **jsdom-testing-mocks**: `1.13.1` → `1.16.0`
- **lint-staged**: `15.4.3` → `15.5.2`
- **postcss**: `8.5.2` → `8.5.6` (indirect dependency)
- **esbuild**: `0.25.0` → `0.25.12` (indirect dependency)
- **type-fest**: `2.19.0` → `4.41.0` (indirect dependency)

## Notes
- All updates are within the `^` (caret) range specified in package.json, so they're valid minor/patch updates
- Storybook had a minor version bump from 9.0.x to 9.1.x
- Webpack had a patch update from 5.98.0 to 5.103.0
- Most updates are patch or minor versions, which is expected behavior with `^` ranges


new ProvidePlugin({
  process: 'process/browser',
}),

Why process package was added
The process package is needed because:
Firebase/gRPC-js compatibility: The comment on lines 131-132 says:
> "Provide a minimal process object for gRPC-js which accesses process directly. This creates a global process variable that gRPC-js can access"
Webpack ProvidePlugin: The webpack config uses ProvidePlugin to inject process as 'process/browser' (a browser polyfill) so code that expects Node.js process works in the browser.
Storybook browser environment: Since Storybook runs in the browser, Node.js globals like process aren't available. The process package provides a browser-compatible polyfill.
Firebase Firestore: The templates package uses Firebase (see the Firebase config in the webpack setup), and some Firebase/gRPC-js code accesses process directly, so the polyfill is required.
Summary: The process package is a browser polyfill needed for Firebase/gRPC-js to work in Storybook's browser environment. It's used by webpack's ProvidePlugin to inject process/browser as a global process object
