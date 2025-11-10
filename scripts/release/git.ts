import { ResetMode, simpleGit } from 'simple-git';
import { chalk } from 'zx';

const git = simpleGit();

export async function ensureCleanWorkingDirectory() {
  const status = await git.status();
  if (status.files.length > 0) {
    console.error(
      chalk.red(
        '❌ Working directory is not clean, please commit or stash your changes.',
      ),
    );
    process.exit(1);
  }
}

export async function commitRelease(message: string) {
  await git.add('.');
  await git.commit(message);
  await git.push();
}

export async function resetWorkingDirectory() {
  console.info(chalk.yellow('🚧 Resetting changes in the working directory'));
  await git.reset(ResetMode.HARD);
}

export async function getCurrentRevision() {
  return await git.revparse(['--short', 'HEAD']);
}

export async function getLastCommitDate() {
  const lastCommitDate = (
    await git.show(['--no-patch', '--format=%as', 'HEAD'])
  ).trim();
  return lastCommitDate;
}
