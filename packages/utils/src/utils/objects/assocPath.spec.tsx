import { assocPath } from '.';

describe('assocPath', () => {
  it('assocPath should work', () => {
    const data = {
      a: {
        name: 'a',
        value: 1,
      },
      b: {
        name: 'b',
        value: 2,
      },
    };
    const result = assocPath(['c', 'name'], 'c')(data);
    expect(result).toEqual({
      a: {
        name: 'a',
        value: 1,
      },
      b: {
        name: 'b',
        value: 2,
      },
      c: {
        name: 'c',
      },
    });
  });
  it('assocPath should not change source object', () => {
    const data = {
      a: {
        name: 'a',
        value: 1,
      },
      b: {
        name: 'b',
        value: 2,
      },
    };
    assocPath(['c', 'name'], 'c')(data);
    expect(data).toEqual({
      a: {
        name: 'a',
        value: 1,
      },
      b: {
        name: 'b',
        value: 2,
      },
    });
  });
});
