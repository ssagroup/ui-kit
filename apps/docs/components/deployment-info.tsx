/**
 * Renders the current deployment's git commit and build time, sourced from
 * Vercel's System Environment Variables (always available at build time,
 * no project configuration required). Falls back to "local" values when run
 * outside Vercel (e.g. `pnpm dev`), so the page still renders sensibly.
 *
 * Usage in MDX: <DeploymentInfo />
 */
export function DeploymentInfo() {
  const env = process.env.VERCEL_ENV ?? 'local';
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;
  const commitRef = process.env.VERCEL_GIT_COMMIT_REF ?? 'local';
  const builtAt = new Date().toISOString();

  const rows: Array<[string, string]> = [
    ['Environment', env],
    ['Branch', commitRef],
    ['Commit', commitSha ? commitSha.slice(0, 7) : 'not deployed via Vercel'],
  ];
  if (commitMessage) {
    rows.push(['Message', commitMessage]);
  }
  rows.push(['Built at', builtAt]);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-fd-border">
      <div className="border-b border-fd-border bg-fd-card px-4 py-2 text-sm font-medium">
        Deployment info
      </div>
      <dl className="divide-y divide-fd-border">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center gap-4 px-4 py-2 text-sm"
          >
            <dt className="w-28 shrink-0 text-fd-muted-foreground">
              {label}
            </dt>
            <dd className="font-mono break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
