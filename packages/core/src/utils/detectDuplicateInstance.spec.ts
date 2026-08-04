import { detectDuplicateInstance } from './detectDuplicateInstance';

const INSTANCE_KEY = Symbol.for('@ssa-ui-kit/core.instance');

describe('utils => detectDuplicateInstance', () => {
  let warn: jest.SpyInstance;

  beforeEach(() => {
    // The kit's own entry point registers a copy when the test bundle loads it,
    // so start every case from a known state.
    delete (globalThis as Record<symbol, unknown>)[INSTANCE_KEY];
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
    delete (globalThis as Record<symbol, unknown>)[INSTANCE_KEY];
  });

  it('stays quiet for a single copy', () => {
    detectDuplicateInstance();

    expect(warn).not.toHaveBeenCalled();
  });

  it('warns when a second copy registers', () => {
    detectDuplicateInstance();
    detectDuplicateInstance();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('Two copies of `@ssa-ui-kit/core`');
  });

  it('warns once however many copies load', () => {
    detectDuplicateInstance();
    detectDuplicateInstance();
    detectDuplicateInstance();
    detectDuplicateInstance();

    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('uses a cross-realm symbol so separate bundles find the same registry', () => {
    detectDuplicateInstance();

    // Symbol.for is what makes the CJS and ESM copies agree; a plain Symbol()
    // would give each copy its own key and detect nothing.
    expect((globalThis as Record<symbol, unknown>)[INSTANCE_KEY]).toEqual({
      count: 1,
    });
  });

  it('is a no-op in production builds', () => {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    detectDuplicateInstance();
    detectDuplicateInstance();

    process.env.NODE_ENV = nodeEnv;

    expect(warn).not.toHaveBeenCalled();
  });
});
