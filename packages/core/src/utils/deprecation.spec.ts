import {
  resetDeprecationWarnings,
  resolveDeprecatedProp,
  resolveDisabled,
  warnDeprecatedProp,
} from './deprecation';

describe('utils => deprecation', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetDeprecationWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  describe('resolveDeprecatedProp', () => {
    const resolve = (
      value: boolean | undefined,
      deprecatedValue: boolean | undefined,
    ) =>
      resolveDeprecatedProp({
        component: 'Widget',
        prop: 'open',
        value,
        deprecatedProp: 'isOpened',
        deprecatedValue,
      });

    it('returns the supported prop when only it is provided', () => {
      expect(resolve(true, undefined)).toBe(true);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('falls back to the deprecated prop and warns', () => {
      expect(resolve(undefined, true)).toBe(true);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('`Widget`');
      expect(warnSpy.mock.calls[0][0]).toContain('`isOpened`');
      expect(warnSpy.mock.calls[0][0]).toContain('`open`');
    });

    it('lets the supported prop win when both are provided, and still warns', () => {
      expect(resolve(false, true)).toBe(false);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('distinguishes an explicit false from an omitted prop', () => {
      expect(resolve(undefined, false)).toBe(false);
      expect(resolve(undefined, undefined)).toBeUndefined();
    });

    it('warns once per component/prop pair, however many times it is called', () => {
      resolve(undefined, true);
      resolve(undefined, true);
      resolve(undefined, false);

      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('warnDeprecatedProp', () => {
    it('warns separately for each component', () => {
      warnDeprecatedProp('Button', 'isDisabled', 'disabled');
      warnDeprecatedProp('Checkbox', 'isDisabled', 'disabled');
      warnDeprecatedProp('Button', 'isDisabled', 'disabled');

      expect(warnSpy).toHaveBeenCalledTimes(2);
    });

    it('is a no-op in production builds', () => {
      const previous = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      try {
        warnDeprecatedProp('Button', 'isDisabled', 'disabled');
        expect(warnSpy).not.toHaveBeenCalled();
      } finally {
        process.env.NODE_ENV = previous;
      }
    });
  });

  describe('resolveDisabled', () => {
    it('prefers disabled over isDisabled', () => {
      expect(resolveDisabled('Button', false, true)).toBe(false);
    });

    it('names both props in the warning', () => {
      resolveDisabled('Button', undefined, true);

      expect(warnSpy.mock.calls[0][0]).toContain('`isDisabled`');
      expect(warnSpy.mock.calls[0][0]).toContain('`disabled`');
    });
  });
});
