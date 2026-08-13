import { readFileSync } from 'fs';
import { join } from 'path';

import { isDevEnvironment } from './environment';

describe('utils => isDevEnvironment', () => {
  const nodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = nodeEnv;
  });

  it('is true in development', () => {
    process.env.NODE_ENV = 'development';

    expect(isDevEnvironment()).toBe(true);
  });

  it('is false in production', () => {
    process.env.NODE_ENV = 'production';

    expect(isDevEnvironment()).toBe(false);
  });

  it('is read per call, not captured at module load', () => {
    process.env.NODE_ENV = 'production';
    expect(isDevEnvironment()).toBe(false);

    process.env.NODE_ENV = 'development';
    expect(isDevEnvironment()).toBe(true);
  });

  it('stays silent rather than throwing where `process` is undefined', () => {
    const original = globalThis.process;
    // A plain <script type="module"> or a bare worker: no `process` at all.
    // The bundle no longer resolves NODE_ENV at build time, so this is a shape
    // the shipped code can genuinely meet.
    delete (globalThis as { process?: unknown }).process;

    expect(() => isDevEnvironment()).not.toThrow();
    expect(isDevEnvironment()).toBe(false);

    globalThis.process = original;
  });

  // The bug this guards against only ever appears in a browser: a bundler
  // substitutes the literal `process.env.NODE_ENV` token and leaves everything
  // else alone, so any `typeof process` check in front of it survives into a
  // runtime with no `process` global and vetoes the substituted value. Jest
  // always has `process`, so reproduce the consumer's bundle directly —
  // substitute, drop `process`, then run it.
  describe('the shape a consumer bundler actually ships', () => {
    const bundleFor = (nodeEnv: string) => {
      const source = readFileSync(join(__dirname, 'environment.ts'), 'utf8');
      const substituted = source
        .replace(/export const/, 'return')
        .replace(/process\.env\.NODE_ENV/g, JSON.stringify(nodeEnv))
        .replace(/: boolean/g, '');

      return new Function(substituted)() as () => boolean;
    };

    const withoutProcess = (run: () => void) => {
      const original = globalThis.process;
      delete (globalThis as { process?: unknown }).process;

      try {
        run();
      } finally {
        globalThis.process = original;
      }
    };

    it('is true in a browser dev build, so warnings actually fire', () => {
      const bundled = bundleFor('development');

      withoutProcess(() => expect(bundled()).toBe(true));
    });

    it('is false in a browser production build', () => {
      const bundled = bundleFor('production');

      withoutProcess(() => expect(bundled()).toBe(false));
    });

    it('has no `typeof process` guard in front of the substituted value', () => {
      const source = readFileSync(join(__dirname, 'environment.ts'), 'utf8');
      const body = source.slice(source.indexOf('export const'));

      expect(body).not.toContain('typeof process');
    });
  });
});
