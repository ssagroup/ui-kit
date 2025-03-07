import { Command, Option } from '@commander-js/extra-typings';
import { $, chalk } from 'zx';

import { getNextVersion, setPackagesVersion } from './version';
import {
  ensureCleanWorkingDirectory,
  commitRelease,
  resetWorkingDirectory,
} from './git';
import { expectAccessToken, promptForOTP } from './npm';
import { PACKAGES_TO_RELEASE } from './packages';
import { publishPackage } from '../publish/publishPackage';
import packageJson from '../../package.json';

const $$ = $({ stdio: 'inherit' });

const program = new Command()
  .addOption(
    new Option(
      '-i, --increment <type>',
      'Increment a version by the specified level',
    )
      .choices([
        'major',
        'minor',
        'patch',
        'premajor',
        'preminor',
        'prepatch',
        'prerelease',
        'canary',
      ])
      .makeOptionMandatory(),
  )
  .option(
    '-p, --preid <identifier>',
    'Identifier to be used to prefix premajor, preminor, prepatch or prerelease version increments',
  )
  .option('-t, --tag <tag>', 'npm tag', 'latest')
  .option('--dry-run', 'Dry run')
  .action(async ({ increment, preid, tag, dryRun }) => {
    await ensureCleanWorkingDirectory();

    const isCanary = increment === 'canary';
    if (isCanary && tag !== 'canary') {
      console.warn(
        chalk.yellow(
          '🚧 Canary release must be tagged with "canary". Tagging with "canary"',
        ),
      );
      tag = 'canary';
    }

    if (preid && tag === 'latest') {
      tag = 'next';
    }

    console.info(
      chalk.blue(
        `🚀 Starting release process ${dryRun ? chalk.white.bold('(dry-run)') : ''}`,
      ),
    );
    const incrementedVersion = await getNextVersion({
      version: packageJson.version,
      increment,
      preid,
    });
    console.info(chalk.blue(`📦 New version: ${incrementedVersion}`));

    const packages = Object.entries(PACKAGES_TO_RELEASE).map(
      ([name, path]) => ({
        name,
        path,
      }),
    );
    const shouldPersistChanges = !dryRun && !isCanary;

    let otp: string | undefined;
    if (!process.env.CI && !dryRun) {
      otp = await promptForOTP();
    }

    const publishOptions = {
      tag,
      otp,
      noGitChecks: !shouldPersistChanges,
      dryRun,
    };

    try {
      expectAccessToken();
      await setPackagesVersion({
        version: incrementedVersion,
        packages,
      });
      if (!dryRun) {
        await $$`pnpm -w build:all`;
      }
      if (shouldPersistChanges) {
        await commitRelease(incrementedVersion);
      }
      const publishTasks = await Promise.allSettled(
        packages.map(({ path }) => publishPackage({ ...publishOptions, path })),
      );
      const failedPublishTasks = publishTasks.filter(
        (task) => task.status === 'rejected',
      );
      if (failedPublishTasks.length > 0) {
        console.error(
          chalk.red(
            `❌ Failed to publish packages:\n${failedPublishTasks
              .map((task) => task.reason)
              .join('\n')}`,
          ),
        );
        process.exit(1);
      }
      console.info(chalk.green('✅ All packages published successfully'));
    } finally {
      await resetWorkingDirectory();
    }
  });

program.parse();
