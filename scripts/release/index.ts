import { $, chalk } from 'zx';

import { Command, Option } from '@commander-js/extra-typings';

import packageJson from '../../package.json';
import { publishPackage } from '../publish/publishPackage';

import {
  commitRelease,
  ensureCleanWorkingDirectory,
  resetWorkingDirectory,
} from './git';
import { promptForOTP, setAccessToken } from './npm';
import {
  CORE_PACKAGES_TO_RELEASE,
  INDIVIDUAL_PACKAGES_TO_RELEASE,
} from './packages';
import {
  getCurrentVersion,
  getNextVersion,
  setPackagesVersion,
} from './version';

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
  .addOption(
    new Option(
      '--package-level <type>',
      'Increment a version by the specified level or individual package to release',
    )
      .choices([
        'core',
        'all',
        'individual',
        ...Object.keys(INDIVIDUAL_PACKAGES_TO_RELEASE),
      ])
      .makeOptionMandatory(),
  )
  .option(
    '-p, --preid <identifier>',
    'Identifier to be used to prefix premajor, preminor, prepatch or prerelease version increments',
  )
  .option('-t, --tag <tag>', 'npm tag', 'latest')
  .option('--npm-access-token <token>', 'NPM access token')
  .option('--dry-run', 'Dry run')
  .action(
    async ({ increment, preid, tag, npmAccessToken, dryRun, packageLevel }) => {
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

      const packagesToRelease = (() => {
        if (packageLevel === 'core') {
          return CORE_PACKAGES_TO_RELEASE;
        } else if (packageLevel === 'individual') {
          return INDIVIDUAL_PACKAGES_TO_RELEASE;
        } else if (packageLevel === 'all') {
          return {
            ...CORE_PACKAGES_TO_RELEASE,
            ...INDIVIDUAL_PACKAGES_TO_RELEASE,
          };
        } else if (
          Object.keys(INDIVIDUAL_PACKAGES_TO_RELEASE).includes(packageLevel)
        ) {
          return {
            [packageLevel]: INDIVIDUAL_PACKAGES_TO_RELEASE[packageLevel],
          };
        } else {
          throw new Error(`Unknown package type: ${packageLevel}`);
        }
      })();

      const packages = await Promise.all(
        Object.entries(packagesToRelease).map(async ([name, path]) => {
          const currentVersion =
            name in CORE_PACKAGES_TO_RELEASE
              ? packageJson.version
              : await getCurrentVersion(path);
          const version = await getNextVersion({
            version: currentVersion,
            increment,
            preid,
          });
          console.info(chalk.blue(`📦 New version for ${name}: ${version}`));
          return {
            name,
            path,
            version,
          };
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
        await setAccessToken(npmAccessToken);
        await setPackagesVersion({
          packages,
        });
        if (!dryRun) {
          await $$`pnpm -w build:all`;
        }
        if (shouldPersistChanges) {
          await commitRelease(
            `Release\n\n${packages.map(({ name, version }) => `- ${name}: ${version}`).join('\n')}\n\n[skip ci]`,
          );
        }

        const monorepoPath =
          CORE_PACKAGES_TO_RELEASE['@ssa-ui-kit/ui-kit-monorepo'];

        const publishTasks = await Promise.allSettled(
          packages
            // skip publishing the monorepo itself
            .filter(({ path }) => path !== monorepoPath)
            .map(({ path }) => publishPackage({ ...publishOptions, path })),
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
    },
  );

program.parse();
