// Renders every story of one component in the running core Storybook and
// reports per-story element counts plus any console / page errors.
//
// Usage (from the repo root, Storybook on 6006 via `pnpm sb:core`):
//   node .claude/skills/audit-stories-docs/scripts/render-check.mjs components-dropdown [selector]
//
// `components-dropdown` is the story-id prefix (see /index.json). `selector`
// is counted in each story to prove the component mounted; defaults to the
// story root having any child.
import { chromium } from '@playwright/test';

const [prefix, selector] = process.argv.slice(2);
if (!prefix) {
  console.error('usage: render-check.mjs <story-id-prefix> [selector]');
  process.exit(2);
}

const BASE = process.env.STORYBOOK_URL ?? 'http://localhost:6006';
let index;
try {
  index = await (await fetch(`${BASE}/index.json`)).json();
} catch {
  console.error(
    `Storybook not reachable at ${BASE} — start it with pnpm sb:core`,
  );
  process.exit(2);
}
const entries = Object.values(index.entries).filter((entry) =>
  entry.id.startsWith(`${prefix}--`),
);
if (!entries.length) {
  console.error(`no stories with id prefix "${prefix}--"`);
  process.exit(1);
}

const browser = await chromium.launch();
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1000 },
  });
  let current = '';
  page.on('console', (message) => {
    if (message.type() === 'error')
      errors.push(`${current}: ${message.text().slice(0, 300)}`);
  });
  page.on('pageerror', (error) =>
    errors.push(`${current}: PAGEERROR ${error.message.slice(0, 300)}`),
  );

  for (const entry of entries) {
    current = entry.id;
    const docs = entry.type === 'docs';
    try {
      await page.goto(
        `${BASE}/iframe.html?id=${entry.id}&viewMode=${docs ? 'docs' : 'story'}`,
      );
      await page.waitForTimeout(docs ? 2500 : 800);
      if (docs) {
        const text = await page
          .locator('#storybook-docs')
          .innerText({ timeout: 10000 });
        console.log(`${entry.id}  docs text length=${text.length}`);
        if (!text.trim()) errors.push(`${entry.id}: docs page is empty`);
      } else {
        const count = selector
          ? await page.locator(selector).count()
          : await page.locator('#storybook-root > *').count();
        console.log(`${entry.id}  ${selector ?? 'root children'}=${count}`);
        if (count === 0)
          errors.push(
            `${entry.id}: nothing mounted (${selector ?? 'root children'}=0)`,
          );
      }
    } catch (error) {
      errors.push(`${entry.id}: FAILED ${error.message.split('\n')[0]}`);
    }
  }
} finally {
  await browser.close();
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'no errors');
process.exit(errors.length ? 1 : 0);
