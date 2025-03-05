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

The project consists of 5 sub-projects:
1. **Core** ([`./packages/core/`](https://github.com/ssagroup/ui-kit/tree/main/packages/core))- The Core library.   
2. **Utils** ([`./packages/utils/`](https://github.com/ssagroup/ui-kit/tree/main/packages/utils)) - Utility functions used by the Core library.  
3. **Hooks** ([`./packages/hooks/`](https://github.com/ssagroup/ui-kit/tree/main/packages/hooks)) - Hooks used by the Core library.  
4. **Widgets** ([`./packages/widgets`](https://github.com/ssagroup/ui-kit/tree/main/packages/widgets)) - Components built on top of the Core library.
5. **Fitness Dashboard** ([`./examples/fitness-dashboard`](https://github.com/ssagroup/ui-kit/tree/main/examples/fitness-dashboard)) - An example Dashboard built on top of the Widgets and Core library.   

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

We use [Storybook Composition](https://storybook.js.org/docs/react/sharing/storybook-composition) that is currently consists of 3 parts:  
1. The [root Storybook](https://github.com/ssagroup/ui-kit/tree/main/.storybook) (has one `.mdx` welcome message and references to the other Storybooks).  
2. The [`Core` library Storybook](https://github.com/ssagroup/ui-kit/tree/main/packages/core/.storybook).  
3. The [`Widgets` library Storybook](https://github.com/ssagroup/ui-kit/tree/main/packages/widgets/.storybook).  

**To run the Storybook Composition in the development mode**:  
``` bash
# Run the following commands in order in separate terminal tabs
# 1. Core library Storybook
> pnpm --filter ./packages/core sb:dev  
# 2. Widgets library Storybook
> pnpm --filter ./packages/widgets sb:dev
# 3. The Root Storybook
> pnpm sb:dev 
```

All the above commands run separate Storybook instances. If you don't need the whole Storybook Composition, you can use just one of the above commands to work on the project you need.  

### Tests

To run tests use one of the following commands:  
``` bash
# 1. Run tests across all the sub-projects
> pnpm test
# 2. Run Core library tests
> pnpm test:core
# 3. Run Utils library tests
> pnpm test:utils
# 4. Run Hooks library tests
> pnpm test:hooks
# 5. Run Widgets library tests
> pnpm test:widgets
```

### Fitness Dashboard

To run the Fitness Dashboard in the development mode use this command:  
```bash
> pnpm --filter ./examples/fitness-dashboard serve
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

Once you've made changes to a library, you have to make a build to let other sub-project see those changes.  
For example, if you change something in the Utils library, you must build it first, then build the Core library, and Widgets Library. After that the changes will be available in the Fitness Dashboard sub-project:  


``` bash
# Make changes to the Utils library, then
# 1. Build the Utils library
> pnpm --filter ./packages/utils build
# 2. Build the Core library
> pnpm --filter ./packages/core build
# 3. Build the Widgets library
> pnpm --filter ./packages/widgets build
# Now the changes are available in the Fitness Dashboard
```

The root `./package.json` contains shortcuts for `build` commands:
```bash
# Build all projects located in the ./packages/ directory
> pnpm build:all
# Build ./packages/utils project
> pnpm build:utils
# Build ./packages/hooks project
> pnpm build:hooks
# Build ./packages/core project
> pnpm build:core
# Build ./packages/widgets project
> pnpm build:widgets
```

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
