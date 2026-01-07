# Storybook main.ts Configuration Changes

## Summary
All Storybook `main.ts` files were updated to fix compatibility issues with React 19, Nivo charts, and Firebase. Below are the changes for each package.

---

## 📦 packages/core/.storybook/main.ts

### Changes Added:

1. **ESM/CommonJS Resolution Fix** (for Nivo charts)
   ```typescript
   mainFields: ['module', 'main'],
   conditionNames: ['import', 'require', 'node', 'default'],
   extensions: ['.mjs', ...(config.resolve?.extensions || [])]
   ```
   **Why:** Fixes issue with `react-virtualized-auto-sizer` in Nivo charts (PR #2773). Ensures webpack prefers ESM builds and can resolve `.mjs` files.

2. **React Instance Deduplication**
   ```typescript
   react: path.resolve(__dirname, '../../../node_modules/react'),
   'react-dom': path.resolve(__dirname, '../../../node_modules/react-dom'),
   ```
   **Why:** Prevents "Cannot read properties of null (reading 'useContext')" errors by ensuring only one React instance is used across the monorepo.

---

## 📦 packages/templates/.storybook/main.ts

### Changes Added:

1. **Webpack Plugin Imports**
   ```typescript
   import { DefinePlugin, NormalModuleReplacementPlugin, ProvidePlugin } from 'webpack';
   ```
   **Why:** Needed for Firebase configuration in browser environment.

2. **TypeScript Type Fix**
   ```typescript
   babel: (options: Record<string, unknown>) => ({ ... })
   ```
   **Why:** Added explicit type annotation for TypeScript compatibility.

3. **ESM/CommonJS Resolution Fix** (same as core)
   - `mainFields`, `conditionNames`, `extensions` for Nivo compatibility

4. **Node.js Module Fallbacks** (for Firebase)
   ```typescript
   fallback: {
     util: false,
     stream: false,
     tls: false,
     net: false,
     http: false,
     http2: false,
     zlib: false,
     dns: false,
     process: false,
     os: false,
     fs: false,
     path: false,
     url: false,
   }
   ```
   **Why:** Firebase/Firestore tries to load Node.js-only modules (like gRPC-js) in browser. These fallbacks tell webpack to ignore them since they're not needed in browser builds.

5. **React Instance Deduplication** (same as core)

6. **React Router Fix**
   ```typescript
   'react-router-dom': resolve(__dirname, '../node_modules/react-router-dom/dist/index.mjs')
   ```
   **Why:** Workaround for react-router bug that can cause multiple versions (issue #12785).

7. **Firebase Firestore Browser Build**
   ```typescript
   '@firebase/firestore': resolve(..., 'dist/index.esm2017.js'),
   'firebase/firestore': resolve(..., 'dist/index.esm2017.js'),
   ```
   **Why:** Forces Firebase to use browser build instead of Node.js build (which includes gRPC-js that doesn't work in browser).

8. **Emotion Instance Deduplication**
   ```typescript
   modules: [
     resolve(__dirname, '../../../node_modules'),
     ...(config.resolve?.modules || ['node_modules']),
   ]
   ```
   **Why:** Ensures single Emotion instance when importing from @ssa-ui-kit/widgets or @ssa-ui-kit/core.

9. **Webpack Plugins for Firebase**
   ```typescript
   // DefinePlugin - Provides process.env for Firebase
   new DefinePlugin({
     'process.env': JSON.stringify({ ...Firebase env vars... })
   }),
   
   // ProvidePlugin - Provides process polyfill for gRPC-js
   new ProvidePlugin({
     process: 'process/browser',
   }),
   
   // NormalModuleReplacementPlugin - Replaces Node.js Firebase build with browser build
   new NormalModuleReplacementPlugin(
     /@firebase\/firestore\/dist\/index\.node\.cjs\.js/,
     resolve(..., 'dist/index.esm2017.js')
   )
   ```
   **Why:** 
   - `DefinePlugin`: Firebase expects Node.js `process.env` variables
   - `ProvidePlugin`: gRPC-js accesses `process` directly, needs browser polyfill
   - `NormalModuleReplacementPlugin`: Prevents Node.js Firebase build from loading

---

## 📦 packages/widgets/.storybook/main.ts

### Changes Added:

1. **TypeScript Type Fix**
   ```typescript
   babel: (options: Record<string, unknown>) => ({ ... })
   ```
   **Why:** Added explicit type annotation for TypeScript compatibility.

2. **ESM/CommonJS Resolution Fix** (same as core)
   - `mainFields`, `conditionNames`, `extensions` for Nivo compatibility

3. **React Instance Deduplication** (same as core)

4. **React Router Fix** (same as templates)

---

## 📦 packages/infra-dash/.storybook/main.ts

**Status:** No changes detected (not modified in this update)

---

## Common Patterns Across All Files

### 1. **Nivo Charts Compatibility**
All files got ESM resolution fixes to work with Nivo charts in React 19:
- Prefer `module` field over `main`
- Support `.mjs` file extensions
- Use `import` condition for package.json exports

### 2. **React 19 Compatibility**
All files got React instance deduplication to prevent multiple React instances causing context errors.

### 3. **Firebase-Specific (templates only)**
Only `packages/templates/.storybook/main.ts` has Firebase-specific configuration because:
- Templates package uses Firebase/Firestore
- Firebase tries to load Node.js-only modules in browser
- Needs browser polyfills and build replacements

---

## Why These Changes Were Needed

1. **React 19 Upgrade**: Stricter type checking and context handling required React instance deduplication
2. **Nivo Charts Update**: ESM resolution needed for proper module loading
3. **Storybook 9.1.x Update**: New version may have changed webpack resolution behavior
4. **Firebase in Browser**: Templates package needed special handling to prevent Node.js modules from loading in browser

