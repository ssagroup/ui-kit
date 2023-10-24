import { pathOr } from '.';

describe('utils => objects => pathOr', () => {
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

  it('should work with correct path', () => {
    const result = pathOr('Default value', ['a', 'name'])(data);
    expect(result).toEqual('a');
  });
  it('should work with incorrect path', () => {
    const result = pathOr('Default value', ['a', 'name', 'value'])(data);
    expect(result).toEqual('Default value');
  });
});
