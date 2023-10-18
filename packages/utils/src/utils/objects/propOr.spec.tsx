import { propOr } from '.';

describe('utils => objects => propOr', () => {
  const data = {
    name: 'a',
    value: 1,
  };

  it('should work with correct prop', () => {
    const result = propOr('Default value', 'name')(data);
    expect(result).toEqual('a');
  });
  it('should work with incorrect prop', () => {
    const result = propOr('Default value', 'incorrect_prop')(data);
    expect(result).toEqual('Default value');
  });
});
