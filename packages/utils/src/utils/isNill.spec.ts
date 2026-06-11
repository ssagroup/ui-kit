import { isNill } from './isNill';

describe('isNill', () => {
  it.each([null, undefined])('returns true for %p', (value) => {
    expect(isNill(value)).toBe(true);
  });

  it.each([0, '', false, NaN, [], {}, 'value', 42])(
    'returns false for %p',
    (value) => {
      expect(isNill(value)).toBe(false);
    },
  );
});
