import { path } from '.';

describe('path', () => {
  it('path should work with correct path', () => {
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
    const result = path(['a', 'name'])(data);
    expect(result).toEqual('a');
  });
  it('path should work with incorrect path', () => {
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
    const result = path(['a', 'name', 'value'])(data);
    expect(result).toEqual(undefined);
  });
});
