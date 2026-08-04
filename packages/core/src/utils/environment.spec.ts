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
});
