import generateRange from './generateRange';

describe('generateRange', () => {
  it('returns an empty array when 0 or negative pages count passed', () => {
    let range = generateRange(0);
    expect(range).toEqual([]);

    range = generateRange(-1);
    expect(range).toEqual([]);
  });

  const noSelectedItemTestCases = [
    { pages: 1, expected: [1] },
    { pages: 2, expected: [1, 2] },
    { pages: 3, expected: [1, 2, 3] },
    { pages: 4, expected: [1, 2, 3, 4] },
    { pages: 5, expected: [1, 2, 3, 4, 5] },
    { pages: 6, expected: [1, 2, 3, -1, 6] },
    { pages: 7, expected: [1, 2, 3, -1, 7] },
    { pages: 8, expected: [1, 2, 3, -1, 8] },
    { pages: 9, expected: [1, 2, 3, -1, 9] },
    { pages: 10, expected: [1, 2, 3, -1, 10] },
  ];

  it.each(noSelectedItemTestCases)(
    'returns the range for $pages pages without a selected one',
    ({ pages, expected }) => {
      const range = generateRange(pages);
      expect(range).toEqual(expected);
    },
  );

  const selectedItemTestCases = [
    { pages: 10, selected: 1, expected: [1, 2, 3, -1, 10] },
    { pages: 10, selected: 2, expected: [1, 2, 3, -1, 10] },
    { pages: 10, selected: 3, expected: [1, 2, 3, 4, -1, 10] },
    { pages: 10, selected: 4, expected: [1, 2, 3, 4, 5, -1, 10] },
    { pages: 10, selected: 5, expected: [1, -1, 4, 5, 6, -1, 10] },
    { pages: 10, selected: 6, expected: [1, -1, 5, 6, 7, -1, 10] },
    { pages: 10, selected: 7, expected: [1, -1, 6, 7, 8, 9, 10] },
    { pages: 10, selected: 8, expected: [1, -1, 7, 8, 9, 10] },
    { pages: 10, selected: 9, expected: [1, -1, 8, 9, 10] },
    { pages: 10, selected: 10, expected: [1, -1, 9, 10] },
  ];

  it.each(selectedItemTestCases)(
    'returns the range for $pages pages when selected item $selected',
    ({ pages, selected, expected }) => {
      const range = generateRange(pages, selected);
      expect(range).toEqual(expected);
    },
  );

  it('throws an error if the selected page is out of range', () => {
    expect(() => generateRange(10, 0)).toThrow(
      new Error('Selected page 0 is out of range'),
    );

    expect(() => generateRange(10, 11)).toThrow(
      new Error('Selected page 11 is out of range'),
    );
  });

  it('throws an error when the 1st argument is not an integer', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => generateRange('1')).toThrow(
      new Error('Pages count should be an integer'),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => generateRange(null)).toThrow(
      new Error('Pages count should be an integer'),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => generateRange(0.1)).toThrow(
      new Error('Pages count should be an integer'),
    );
  });

  it('throws an error when the 2nd argument is not an integer', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => generateRange(10, '1')).toThrow(
      new Error('Selected page should be an integer'),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => generateRange(10, 0.1)).toThrow(
      new Error('Selected page should be an integer'),
    );
  });
});
