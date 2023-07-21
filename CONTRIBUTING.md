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

## Project structure

The project consists of 4 sub-projects:
1. **Core** (`./packages/core/`)- The Core library.   
2. **Utils** (`./packages/utils/`) - Utility functions used by the Core library.  
3. **Hooks** (`./packages/hooks/`) - Hooks used by the Core library.  
4. **Fitness Dashboard** (`./examples/fitness-dashboard`) - An example Dashboard and Widgets it's built with.

## Development

See the `package.json` files for the available pNPM scripts:   
`./package.json`,   
`./packages/core/package.json`,   
`./packages/hooks/package.json`,   
`./packages/utils/package.json`,   
`./examples/fitness-dashboard/package.json`.    

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
1. The root Storybook (has one `.mdx` welcome message and references to the other Storybooks).  
2. The `Core` library Storybook.  
3. The `Fitness Widgets` library Storybook.  

**To run the Storybook Composition in the development mode**:  
``` bash
# Run the following commands in order in separate terminal tabs
# 1. Core library Storybook
> pnpm --filter ./packages/core sb:dev  
# 2. Fitness Dashboard widgets Storybook
> pnpm --filter ./examples/fitness-dashboard sb:dev
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
# 5. Run Fitness Dashboard tests
> pnpm test:fitness
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
# Adds a package to the pNPM workspace root
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
# Adds a dev package to the Core library
> pnpm add @storybook/react --filter ./packages/core -D
# Removes a dev package from the Core library
> pnpm remove @storybook/react --filter ./packages/core -D
```

### Building 

Once you've made changes to a library, you have to make a build to let other sub-project see those changes.  
For example, if you change something in the Utils library, you must build it first, then build the Core library. After that the changes will be available in the Fitness Dashboard sub-project:  


``` bash
# Make changes to the Utils library, then
# 1. Build the Utils library
> pnpm --filter ./packages/utils build
# 2. Build the Core library
> pnpm --filter ./packages/core build
# Now the changes are available in the Fitness Dashboard
```


### Configurations

#### Typescript configuration 
TODO

#### Webpack configuration
TODO

