#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
'use strict';

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.join(__dirname);
const componentName = process.argv[2];
const componentDir = path.join(rootDir, '../src/components');
const componentPath = path.join(componentDir, componentName);

console.log('\x1b[33m%s\x1b[0m', ' > Creating component folder');

fs.access(componentPath, (error) => {
  // already exists or not
  if (error) {
    // If current directory does not exist then create it
    fs.mkdir(componentPath, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        // execSync(`cp -R ${templateDir}/* ${componentPath}`);
        execSync(`touch ${componentPath}/index.tsx`);
        execSync(`touch ${componentPath}/${componentName}.spec.tsx`);
        execSync(`touch ${componentPath}/${componentName}.stories.tsx`);
        execSync(`touch ${componentPath}/types.ts`);
        execSync(`touch ${componentPath}/styles.ts`);
        execSync(`touch ${componentPath}/${componentName}.tsx`);

        console.log(
          '\x1b[32m%s\x1b[0m',
          ` ✔️ New component ${componentName} created successfully!`,
        );
      }
    });
  } else {
    console.log(
      '\x1b[31m%s\x1b[0m',
      ` ✗ The component ${componentName} already exists!`,
    );
  }
});
