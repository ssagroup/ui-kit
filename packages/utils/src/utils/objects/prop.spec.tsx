import { prop } from '.';

describe('utils => objects => prop', () => {
  const data = {
    name: 'a',
    value: 1,
  };

  it('should work with correct prop', () => {
    const result = prop('name')(data);
    expect(result).toEqual('a');
  });
  it('should work with incorrect prop', () => {
    const result = prop('incorrect_prop')(data);
    expect(result).toEqual(undefined);
  });
});
