import { mapObjIndexed } from '.';

describe('utils => objects => mapObjIndexed', () => {
  it('mapObjIndexed should work', () => {
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
    const result = mapObjIndexed(
      (item, key) => ({
        name: key,
        value: item.value + key,
      }),
      data,
    );
    expect(result).toEqual({
      a: {
        name: 'a',
        value: '1a',
      },
      b: {
        name: 'b',
        value: '2b',
      },
    });
  });
});
