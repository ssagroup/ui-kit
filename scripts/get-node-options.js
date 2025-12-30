#!/usr/bin/env node

const v = process.versions.node.split('.');
const supportsNoWebstorage = v[0] >= 20 || (v[0] == 18 && v[1] >= 17);

if (supportsNoWebstorage) {
  console.log('--no-webstorage');
} else {
  console.log('');
}
