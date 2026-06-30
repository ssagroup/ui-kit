import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const withMDX = createMDX();

const monorepoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Monorepo: pin the workspace root so Next traces the right lockfile.
  outputFileTracingRoot: monorepoRoot,
  // The repo-root ESLint/Prettier config isn't tuned for this Next app; keep the
  // POC build decoupled from it. A dedicated eslint-config-next setup is a
  // follow-up if this graduates past POC.
  eslint: { ignoreDuringBuilds: true },
  // @ssa-ui-kit/core is a workspace package shipped as a UMD bundle that pulls in
  // browser-only chart deps (plotly, nivo). It is only ever imported from client
  // components loaded via next/dynamic({ ssr: false }), so it never hits the server.
  transpilePackages: ['@ssa-ui-kit/core'],
};

export default withMDX(config);
