import { dissocPath } from '.';

describe('utils => objects => dissocPath', () => {
  it('dissocPath should work', () => {
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
    const result = dissocPath(['a', 'name'])(data);
    expect(result).toEqual({
      a: {
        value: 1,
      },
      b: {
        name: 'b',
        value: 2,
      },
    });
  });
  it('dissocPath should not change source object', () => {
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
    dissocPath(['a', 'name'])(data);
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
