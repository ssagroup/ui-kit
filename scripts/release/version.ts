import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import semver from 'semver';
import { chalk } from 'zx';

import { getCurrentRevision, getLastCommitDate } from './git';

type NextVersionOptions = {
  version: string;
  increment: string;
  preid?: string;
};

export async function getNextVersion({
  version,
  increment,
  preid,
}: NextVersionOptions) {
  if (increment === 'canary') {
    const revision = await getCurrentRevision();
    const date = (await getLastCommitDate()).replaceAll('-', '');
    return `${version}-canary-${revision}-${date}`;
  }

  const incrementedVersion = semver.inc(version, increment, preid);
  if (!incrementedVersion) {
    throw new Error(`Failed to increment version ${version} by ${increment}`);
  }
  return incrementedVersion;
}

async function writeVersionToPackageJson(path: string, version: string) {
  const packageJsonPath = resolve(path, './package.json');
  const packageJson = JSON.parse(
    await readFile(packageJsonPath, { encoding: 'utf-8' }),
  );
  packageJson.version = version;
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

type SetPackagesVersionOptions = {
  packages: {
    name: string;
    path: string;
  }[];
  version: string;
};

export async function setPackagesVersion({
  packages,
  version,
}: SetPackagesVersionOptions) {
  let failed = false;

  for (const { name, path } of packages) {
    console.log(
      chalk.blue(`📦 Setting version ${version} for package ${name}`),
    );
    try {
      await writeVersionToPackageJson(path, version);
    } catch (error: unknown) {
      console.error(`${chalk.red(`❌ ${path}`)}`, error);
      failed = true;
    }
  }

  if (failed) {
    throw new Error('Failed to update package version');
  }

  console.log(chalk.green(`📦 Setting version ${version} for package root`));
  await writeVersionToPackageJson('.', version);
}
