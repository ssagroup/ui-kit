# PieChart Fix - Implementation Checklist

## ✅ Completed in Library (@ssa-ui-kit)

### Webpack Configs
- [x] `packages/core/webpack.config.js` - Added @nivo to allowlist
- [x] `packages/widgets/webpack.config.js` - Added @nivo to allowlist
- [x] `packages/templates/webpack.config.js` - Added @nivo to allowlist

### Package.json Files
- [x] `packages/core/package.json` - @nivo remains in devDependencies & peerDependencies
- [x] `packages/widgets/package.json` - @nivo remains in devDependencies & peerDependencies
- [x] `packages/templates/package.json` - @nivo remains in devDependencies & peerDependencies

### Code
- [x] `packages/core/src/components/Charts/utils/nivoReact19Compat.tsx` - Detection-based unwrapper with logging

## 🔄 Next Steps for Library

### 1. Build Canary Version
```bash
# In ui-kit repository
pnpm build:core
pnpm build:widgets  
pnpm build:templates
```

### 2. Verify Bundle Sizes
```bash
# Check core package
ls -lh packages/core/dist/index.js
# Expected: ~700-900KB (vs ~500KB before)

# Check widgets package  
ls -lh packages/widgets/dist/index.js
# Expected: ~400-600KB increase

# Check templates package
ls -lh packages/templates/dist/index.js
# Expected: ~400-600KB increase
```

### 3. Verify @nivo is Bundled
```bash
# Should find ResponsiveWrapper function definition
grep -i "ResponsiveWrapper" packages/core/dist/index.js | head -5

# Should find @nivo code
grep -i "@nivo" packages/core/dist/index.js | head -5
```

### 4. Publish Canary
```bash
# Follow your canary publishing process
pnpm release # or your custom script
```

## 📦 Steps for Consuming App (PeopleOps.Frontend)

### 1. Ensure @nivo Dependencies Are Installed
```bash
# In your consuming app, make sure @nivo packages are installed
# They're peerDependencies of @ssa-ui-kit, so they should be present:
cat package.json | grep "@nivo"
```

**Expected**:
```json
{
  "dependencies": {
    "@nivo/core": "^0.99.0",
    "@nivo/line": "^0.99.0",
    "@nivo/pie": "^0.99.0",
    "@nivo/radar": "^0.99.0",
    "@nivo/scales": "^0.99.0",
    "@nivo/treemap": "^0.99.0",
    "@nivo/colors": "^0.99.0"
  }
}
```

**If missing**, install them:
```bash
pnpm install @nivo/core@^0.99.0 @nivo/line@^0.99.0 @nivo/pie@^0.99.0 @nivo/radar@^0.99.0 @nivo/scales@^0.99.0 @nivo/treemap@^0.99.0 @nivo/colors@^0.99.0
```

**Note**: Even though @nivo is bundled in the library, it remains a peerDependency to signal version requirements and prevent warnings.

### 2. Install New Canary Version
```bash
# Install the new canary version
pnpm install @ssa-ui-kit/core@2.32.0-canary-XXXXXX
pnpm install @ssa-ui-kit/widgets@2.32.0-canary-XXXXXX

# Or update all @ssa-ui-kit packages
pnpm update @ssa-ui-kit/*
```

### 3. Test the Fix
```bash
# Start dev server
pnpm dev

# Or production build
pnpm build
```

**Expected Results**:
- ✅ No "Element type is invalid" error
- ✅ PieChart renders correctly
- ✅ No ResponsiveWrapper errors in console
- ✅ Check browser dev tools console for debug logs (in dev mode):
  ```
  [wrapNivoResponsiveComponent] ResponsivePie: { type: "function", isFunction: true, ... }
  ```

### 4. Check Bundle Size (Optional)
```bash
# After build, check bundle size
ls -lh dist/assets/*.js

# Should see @nivo bundled inside @ssa-ui-kit chunks
```

## 🐛 If Issues Persist

### Debug Checklist

1. **Check Console Logs** (dev mode only)
   - Look for `[wrapNivoResponsiveComponent]` logs
   - Should show `type: "function"`, not `type: "object"`

2. **Check Bundle Contents**
   ```bash
   # In consuming app's build output
   grep -r "ResponsiveWrapper" dist/assets/
   # Should find it in @ssa-ui-kit chunks, not @nivo chunks
   ```

3. **Accept Potential @nivo Duplication**
   ```bash
   # Check node_modules - @nivo should be present
   ls node_modules/@nivo/
   # Should contain @nivo packages (expected)
   ```
   **Note**: @nivo is bundled in the library AND present as external dependency. This is intentional.

4. **Check Network Tab**
   - Look for chunk loading errors
   - Check for 404s on @nivo modules

5. **Try Clean Install**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

## 📝 Notes

### Why This Fix Works
- **Before**: @nivo was external → Consuming app's bundler resolved it → Module resolution mismatch → Object instead of function
- **After**: @nivo is bundled in library → All internal dependencies resolved correctly at library build time → Function types preserved

### Trade-offs Accepted
- ✅ **Reliability**: Works across all bundlers/configs
- ✅ **Zero config**: No consumer setup needed
- ⚠️ **Bundle size**: +200-300KB (~60-80KB gzipped)
- ⚠️ **Version lock**: Consuming apps use library's @nivo version

### Alternative (Not Recommended)
If bundle size is critical, consuming apps could configure their bundler correctly instead. But this:
- Requires documentation for each bundler type
- May not work reliably across all configurations
- Puts burden on every consuming app
- Hard to debug when it breaks

**Conclusion**: Bundling @nivo is the pragmatic solution.
