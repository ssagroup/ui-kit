import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { $, chalk } from 'zx';

export async function setAccessToken(npmAccessToken?: string) {
  const npmrcExists = existsSync(resolve('.npmrc'));

  if (!npmAccessToken && !process.env.NPM_TOKEN && !npmrcExists) {
    console.error(
      chalk.red(
        '❌ NPM access token is required. Please provide it via --npm-access-token or NPM_TOKEN environment variable or create a .npmrc file with the token',
      ),
    );
    process.exit(1);
  }

  await $`pnpm config set '//registry.npmjs.org/:_authToken' ${npmAccessToken ?? process.env.NPM_TOKEN}`;
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
