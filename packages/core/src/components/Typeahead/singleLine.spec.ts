import { getVisibleCount } from './singleLine';

describe('getVisibleCount', () => {
  it('returns 0 without chips', () => {
    expect(getVisibleCount([], 100)).toBe(0);
  });

  it('shows every chip without reserving the counter when all fit', () => {
    // 100 + 8 + 100 = 208; no counter needed.
    expect(getVisibleCount([100, 100], 208)).toBe(2);
  });

  it('reserves room for the counter while chips are left out', () => {
    // Two chips need 208 + 8 + 24 = 240 once a third is hidden.
    expect(getVisibleCount([100, 100, 100], 239)).toBe(1);
    expect(getVisibleCount([100, 100, 100], 240)).toBe(2);
  });

  it('never drops below one chip', () => {
    expect(getVisibleCount([500, 10], 100)).toBe(1);
  });

  it('stops at the first chip that does not fit, keeping order', () => {
    expect(getVisibleCount([50, 300, 20], 200)).toBe(1);
  });
});
