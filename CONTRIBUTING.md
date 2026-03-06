# Contribution guide

## Installation

### Node.js

To be able to develop and build the project you have to have [`Node.js`](https://nodejs.org/en) installed.  
Please refer to the [`./.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) file to see which `Node.js` version should be used. Make sure you use the same or above version.   

If you are using Node Version Manager [`NVM`](https://github.com/nvm-sh/nvm), you can run the following command to switch to the required version:
```bash
> nvm use
```

### pNPM and dependencies

SSA UI Kit is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) based on [`pNPM Workspace`](https://pnpm.io/workspaces) feature.  

**1. Install pNPM** - [https://pnpm.io/installation](https://pnpm.io/installation)
```bash
# Install pNPM, e.g. 
> npm install -g pnpm
```

**2. Install dependencies** - [https://pnpm.io/cli/install](https://pnpm.io/cli/install)
```bash
# 1. Clone the repository
> git clone git@github.com:ssagroup/ui-kit.git
# 2. Install dependencies
> pnpm install --frozen-lockfile
```

**3. Build projects located in ./packages/ directory**

After installing the dependencies you have to build all the sub-projects to be able to work locally:  
```bash
pnpm build:all
```

## Project structure

The project is a monorepo consisting of multiple packages and examples:

### Core Packages

1. **Core** ([`./packages/core/`](https://github.com/ssagroup/ui-kit/tree/main/packages/core)) - The main UI component library containing all base components (buttons, inputs, tables, forms, etc.). This is the foundation of the design system.

2. **Utils** ([`./packages/utils/`](https://github.com/ssagroup/ui-kit/tree/main/packages/utils)) - Utility functions and helpers used across the UI Kit. Contains pure functions for data manipulation, formatting, and common operations.

3. **Hooks** ([`./packages/hooks/`](https://github.com/ssagroup/ui-kit/tree/main/packages/hooks)) - Custom React hooks used by the Core library and other packages. Provides reusable stateful logic and side effects.

4. **Widgets** ([`./packages/widgets`](https://github.com/ssagroup/ui-kit/tree/main/packages/widgets)) - Higher-level components built on top of the Core library. Widgets combine multiple Core components to create complex, feature-rich UI elements (dashboards, charts, data tables, etc.).

5. **Templates** ([`./packages/templates`](https://github.com/ssagroup/ui-kit/tree/main/packages/templates)) - Pre-built page templates and layouts that demonstrate how to combine Core components and Widgets into complete page structures.

6. **Infra-Dash** ([`./packages/infra-dash`](https://github.com/ssagroup/ui-kit/tree/main/packages/infra-dash)) - Infrastructure dashboard components and monitoring widgets, specialized for infrastructure and system monitoring use cases.

### Examples

7. **Fitness Dashboard** ([`./examples/fitness-dashboard`](https://github.com/ssagroup/ui-kit/tree/main/examples/fitness-dashboard)) - A complete example application demonstrating how to use the UI Kit packages together. Built on top of Widgets, Core, Hooks, and Utils.   

## Development

See the `package.json` files for the available pNPM scripts:   
[`./package.json`](https://github.com/ssagroup/ui-kit/blob/main/package.json),   
[`./packages/core/package.json`](https://github.com/ssagroup/ui-kit/blob/main/packages/core/package.json),   
[`./packages/hooks/package.json`](https://github.com/ssagroup/ui-kit/blob/main/packages/hooks/package.json),   
[`./packages/utils/package.json`](https://github.com/ssagroup/ui-kit/blob/main/packages/utils/package.json),   
[`./packages/widgets/package.json`](https://github.com/ssagroup/ui-kit/blob/main/packages/widgets/package.json),   
[`./examples/fitness-dashboard/package.json`](https://github.com/ssagroup/ui-kit/blob/main/examples/fitness-dashboard/package.json).    

<ins>All commands and scripts</ins> should be run from the project root.  

To run a script for the root project use this syntax: `pnpm <script-name>`, e.g.  
```bash
> pnpm test 
```

To run a script for a sub-project use the [`--filter`](https://pnpm.io/filtering) flag: `pnpm --filter <package_selector> <command>`, e.g.
```bash
# Runs the `build` command for the Core project (./packages/core/package.json)
> pnpm --filter ./packages/core build
```

### Storybook

We use [Storybook Composition](https://storybook.js.org/docs/react/sharing/storybook-composition) that consists of multiple Storybook instances:  
1. The [root Storybook](https://github.com/ssagroup/ui-kit/tree/main/.storybook) (port 6001) - Main entry point with welcome message and references to all other Storybooks.  
2. The [`Core` library Storybook](https://github.com/ssagroup/ui-kit/tree/main/packages/core/.storybook) (port 6006) - Documentation for all Core components.  
3. The [`Widgets` library Storybook](https://github.com/ssagroup/ui-kit/tree/main/packages/widgets/.storybook) (port 6007) - Documentation for Widget components.  
4. The [`Templates` library Storybook](https://github.com/ssagroup/ui-kit/tree/main/packages/templates/.storybook) (port 6008) - Documentation for Template components.  
5. The [`Infra-Dash` library Storybook](https://github.com/ssagroup/ui-kit/tree/main/packages/infra-dash/.storybook) (port 6009) - Documentation for Infra-Dash components.  

**To run Storybook in development mode**:  
```bash
# Run individual Storybook instances (choose based on what you're working on)
> pnpm sb:dev              # Root Storybook (port 6001)
> pnpm sb:core            # Core library Storybook (port 6006)
> pnpm sb:widgets         # Widgets library Storybook (port 6007)
> pnpm sb:templates       # Templates library Storybook (port 6008)
> pnpm sb:infra-dash      # Infra-Dash library Storybook (port 6009)
```

**To run the full Storybook Composition** (all instances together):  
```bash
# Run the following commands in separate terminal tabs
# 1. Core library Storybook
> pnpm sb:core
# 2. Widgets library Storybook
> pnpm sb:widgets
# 3. Templates library Storybook (optional)
> pnpm sb:templates
# 4. Infra-Dash library Storybook (optional)
> pnpm sb:infra-dash
# 5. The Root Storybook (must be last)
> pnpm sb:dev
```

**To build Storybook for production**:  
```bash
# Build individual Storybooks
> pnpm sb:build:root       # Root Storybook
> pnpm sb:build:core       # Core library Storybook
> pnpm sb:build:widgets    # Widgets library Storybook
> pnpm sb:build:templates  # Templates library Storybook
> pnpm sb:build:infra-dash # Infra-Dash library Storybook
```

All Storybook instances run separately. If you don't need the whole Storybook Composition, you can use just one of the above commands to work on the specific package you need.  

### Tests

The project uses [Jest](https://jestjs.io/) for unit tests and [Playwright](https://playwright.dev/) for end-to-end (E2E) tests.

#### Unit Tests

**Run all unit tests**:  
```bash
# Run tests across all packages
> pnpm test
```

**Run tests for specific packages**:  
```bash
> pnpm test:core        # Core library tests
> pnpm test:utils       # Utils library tests
> pnpm test:hooks       # Hooks library tests
> pnpm test:widgets     # Widgets library tests
> pnpm test:templates   # Templates library tests
> pnpm test:infra-dash  # Infra-Dash library tests
```

**Test utilities**:  
```bash
# Run tests with coverage report
> pnpm test:coverage

# Update snapshot tests
> pnpm test:update-snapshots

# Update snapshots in parallel (faster for large projects)
> pnpm test:update-snapshots:parallel

# Clear Jest cache (useful if tests are behaving unexpectedly)
> pnpm test:clearcache
```

#### End-to-End (E2E) Tests

E2E tests use Playwright and test components in a real browser environment.

**Run all E2E tests**:  
```bash
# Run E2E tests for Core and Widgets
> pnpm test:e2e
```

**Run E2E tests for specific packages**:  
```bash
# Core library E2E tests
> pnpm test:core:e2e         # Run in headless mode
> pnpm test:core:e2e:ui      # Run with Playwright UI
> pnpm test:core:e2e:debug   # Run in debug mode

# Widgets library E2E tests
> pnpm test:widgets:e2e
> pnpm test:widgets:e2e:ui
> pnpm test:widgets:e2e:debug

# Templates library E2E tests
> pnpm test:templates:e2e
> pnpm test:templates:e2e:ui
> pnpm test:templates:e2e:debug

# Infra-Dash library E2E tests
> pnpm test:infra-dash:e2e
> pnpm test:infra-dash:e2e:ui
> pnpm test:infra-dash:e2e:debug
```

**E2E test modes**:
- **Headless mode** (`test:e2e`) - Runs tests without opening a browser window (fastest, used in CI)
- **UI mode** (`test:e2e:ui`) - Opens Playwright's interactive UI to watch tests run and debug
- **Debug mode** (`test:e2e:debug`) - Opens browser in debug mode with Playwright Inspector

### Linting and Code Quality

**ESLint** (JavaScript/TypeScript linting):  
```bash
# Lint all files
> pnpm lint

# Lint specific files or directories
> pnpm lint packages/core/src
```

**Stylelint** (CSS/TSX style linting):  
```bash
# Lint styles in all TSX files
> pnpm lint:styles
```

**Spellcheck**:  
```bash
# Check spelling in all TypeScript, TSX, and Markdown files
> pnpm spellcheck

# Check specific file
> pnpm spellcheck CONTRIBUTING.md
```

### Examples

**Fitness Dashboard** - Example application demonstrating UI Kit usage:  
```bash
# Run in development mode
> pnpm --filter ./examples/fitness-dashboard serve

# Build for production
> pnpm --filter ./examples/fitness-dashboard build
```

### Dependencies management

According to the [pNPM Workspace](https://pnpm.io/workspaces) feature, all the dependencies should be installed from the project root.   

To install/remove a **root** dependency use [this syntax](https://pnpm.io/pnpm-cli#-w---workspace-root): `pnpm add <package> -w` or `pnpm remove <package> -w`, e.g.   
``` bash
# Adds a package to the pNPM workspace root (./package.json)
> pnpm add @emotion/react -w
# Removes a package from the pNPM workspace root
> pnpm remove @emotion/react -w
# Adds a package as a dev dependency to the pNPM workspace root
> pnpm add webpack -w -D
# Removes a dev dependency from the pNPM workspace root
> pnpm remove webpack -w -D
```

To install/remove a dependency to/from a sub-project use this syntax (instead of the `-w` flag use the `--filter` flag): `pnpm add <package> --filter <sub-project>`, e.g.  

``` bash
# Adds a dev package to the Core library (./packages/core/package.json)
> pnpm add @storybook/react --filter ./packages/core -D
# Removes a dev package from the Core library
> pnpm remove @storybook/react --filter ./packages/core -D
```

### Building 

Once you've made changes to a library, you need to build it so other packages can see those changes.  
**Build order matters**: Build packages in dependency order (Utils → Hooks → Core → Widgets → Templates/Infra-Dash).

**Example**: If you change something in the Utils library:
```bash
# 1. Build the Utils library
> pnpm build:utils
# 2. Build the Hooks library (if it depends on Utils)
> pnpm build:hooks
# 3. Build the Core library (depends on Utils and Hooks)
> pnpm build:core
# 4. Build the Widgets library (depends on Core)
> pnpm build:widgets
# 5. Build Templates or Infra-Dash if needed
> pnpm build:templates
> pnpm build:infra-dash
# Now the changes are available in dependent packages
```

**Build commands**:
```bash
# Build all packages in ./packages/ directory
> pnpm build:all

# Build individual packages
> pnpm build:utils       # Utils library
> pnpm build:hooks       # Hooks library
> pnpm build:core       # Core library
> pnpm build:widgets    # Widgets library
> pnpm build:templates  # Templates library
> pnpm build:infra-dash # Infra-Dash library

# Watch mode for Core (rebuilds automatically on file changes)
> pnpm build:core:watch
```

**Note**: The build process compiles TypeScript, bundles with Webpack, and resolves TypeScript path aliases. Each package outputs to its `dist/` directory.

## Release Process

### Release Git Flow

#### Major/Minor/Patch Release

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/9176fe67-53cc-455f-bbbc-ff62d38936d1">
</div>

- `main` (green) is our primary line. New versions (minor or major) release from here.
- `feature/*` (red) branches handle new features, which get merged back into main.
- `bugfix/*` (blue) branches address specific bugs, then merge back for patch releases.
- `release/v1` (yellow) is a long-term maintenance branch for older major releases, receiving only critical fixes and patches.

Each release commit bumps the version and publishes to npm under a relevant tag (e.g. latest for the current release and latest-v1 for older maintenance versions).
This allows us to maintain multiple active versions in parallel.

#### Major/Minor/Patch Release With Stages

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/589dcab6-02cc-43d8-a87b-2969e88a4dee">
</div>

When preparing a new major version (e.g. 2.0.0), we can publish release candidates (2.0.0-rc.x) under a `next` dist-tag for testing, keeping the current release as latest.
Once finalized, the major release (2.0.0) goes to latest, and the process repeats.

### Canary Release

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/384d77f7-0168-471f-952e-e9bcaf428dfa">
</div>

When a feature branch (feature/*) includes significant changes, we can publish a “canary” package version (e.g. 1.2.3-canary-{git-revision}-{commit-date}).
This lets early adopters test the latest feature commits without affecting the stable release.
Once the feature is finalized and merged, a standard “release commit” increments the stable version (e.g. 1.3.0).

### Release Script

Release script supports the following options:

- `--increment` - specifies the version increment type: `major`, `minor`, `patch`, `premajor`, `preminor`, `prepatch`, `prerelease`, `canary`.
- `--preid` - specifies the prerelease identifier.
- `--tag` - specifies the NPM tag for the release.
- `--dry-run` - runs the script without publishing the package.

#### Example

```bash
# Version: 1.1.1
> pnpm release --increment patch
# Incremented version: 1.1.2

# Version: 1.1.1
> pnpm release --increment minor
# Incremented version: 1.2.0

# Version: 1.1.1
> pnpm release --increment major
# Incremented version: 2.0.0
```

##### Prerelease

```bash
# Version: 1.1.1
> pnpm release --increment premajor --preid alpha
# Incremented version: 2.0.0-alpha.0

# Version: 2.0.0-alpha.0
> pnpm release --increment prerelease
# Incremented version: 2.0.0-alpha.1

# Version: 2.0.0-alpha.1
> pnpm release --increment prerelease --preid beta
# Incremented version: 2.0.0-beta.0

# Version: 2.0.0-beta.0
> pnpm release --increment release
# Incremented version: 2.0.0
```

##### Canary *(will not be persisted in the package.json)*

```bash
# Version: 1.1.2
> pnpm release --increment canary
# Incremented version: 1.1.2-canary-{git-revision}-{commit-date}
```
