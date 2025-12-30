#!/usr/bin/env node

const v = process.versions.node.split('.');
const major = parseInt(v[0]);

// Node 24+ should definitely support --no-webstorage
// Node 21-23 may have CI compatibility issues
const supportsNoWebstorage = major >= 24;

// Always include memory limit for large builds
const baseOptions = ['--max_old_space_size=8192'];

if (supportsNoWebstorage) {
  baseOptions.push('--no-webstorage');
}

const nodeOptions = baseOptions.join(' ');

// Try to set NODE_OPTIONS, but handle cases where flags might be rejected
try {
  process.env.NODE_OPTIONS = nodeOptions;
  console.log(`NODE_OPTIONS set to: ${nodeOptions}`);
} catch (error) {
  console.warn(`Warning: Could not set NODE_OPTIONS: ${error.message}`);
  console.log('NODE_OPTIONS not set due to environment restrictions');
}
