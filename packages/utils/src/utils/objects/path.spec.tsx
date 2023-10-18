import { path } from '.';

describe('utils => objects => path', () => {
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

  it('path should work with correct path', () => {
    const result = path(['a', 'name'])(data);
    expect(result).toEqual('a');
  });

  it('path should work with incorrect path', () => {
    const result = path(['a', 'name', 'value'])(data);
    expect(result).toEqual(undefined);
  });
});
