import { $, chalk } from 'zx';

const $$ = $({ stdio: 'inherit' });

type PublishOptions = {
  path: string;
  tag: string;
  otp?: string;
  noGitChecks?: boolean;
  dryRun?: boolean;
};

export async function publishPackage({
  path,
  tag,
  otp,
  noGitChecks,
  dryRun,
}: PublishOptions) {
  try {
    const args = [path, '--tag', tag];
    if (otp) {
      args.push('--otp', otp);
    }
    if (noGitChecks) {
      args.push('--no-git-checks');
    }
    if (dryRun) {
      args.push('--dry-run');
    }
    await $$`pnpm publish ${args}`;
    console.log(chalk.green(`✅ Package ${path} published successfully`));
  } catch (error: unknown) {
    console.error(chalk.red(`Failed to publish package ${path}:\n${error}`));
    throw error;
  }
}
