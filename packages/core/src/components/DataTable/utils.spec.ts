import { toCellElementProps, toRowElementProps } from './utils';

describe('DataTable element props', () => {
  it('passes a row background on as a custom property', () => {
    const { isTinted, style } = toRowElementProps({
      background: 'red',
      style: { fontWeight: 700 },
    });

    expect(isTinted).toBe(true);
    expect(style).toEqual({
      fontWeight: 700,
      '--data-table-row-tint': 'red',
    });
  });

  it('leaves an untinted row alone', () => {
    expect(toRowElementProps({ className: 'x' })).toEqual({
      className: 'x',
      isTinted: false,
      style: undefined,
    });
  });

  it('paints a cell background over white', () => {
    expect(toCellElementProps({ background: 'red' }).style).toEqual({
      background: 'linear-gradient(red, red), #fff',
    });
  });

  it('keeps the table own style over the cell style', () => {
    expect(
      toCellElementProps(
        { style: { color: 'red', paddingLeft: 0 } },
        { paddingLeft: 40 },
      ).style,
    ).toEqual({ color: 'red', paddingLeft: 40 });
  });

  it('gives no style when there is none', () => {
    expect(toCellElementProps(undefined).style).toBeUndefined();
  });
});
