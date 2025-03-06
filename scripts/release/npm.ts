import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';

import { chalk } from 'zx';

export function expectAccessToken() {
  const npmrcExists = existsSync(resolve('.npmrc'));

  if (process.env.NPM_TOKEN || npmrcExists) {
    return;
  }

  console.error(
    chalk.red(
      '❌ NPM access token is required. Please provide it via NPM_TOKEN environment variable or create a .npmrc file with the token',
    ),
  );
  process.exit(1);
}

export async function promptForOTP() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let otp: string | undefined;

  while (!otp) {
    otp = await rl.question('NPM 2FA auth code: ');
  }

  rl.close();
  return otp;
}
