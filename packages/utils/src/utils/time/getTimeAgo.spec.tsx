import { getTimeAgo } from './timeAgo';

const date = Date.now();
const timeValuesArr = [
  {
    input: date - 6000,
    output: 'Just Now',
  },
  {
    input: date - 60000,
    output: '1 min ago',
  },
  {
    input: date - 120000,
    output: '2 mins ago',
  },
  {
    input: date - 6000000,
    output: '1 hour ago',
  },
  {
    input: date - 8000000,
    output: '2 hours ago',
  },
  {
    input: date - 120000000,
    output: '1 day ago',
  },
  {
    input: date - 240000000,
    output: '2 days ago',
  },
  {
    input: date - 1200000000,
    output: '1 week ago',
  },
  {
    input: date - 1400000000,
    output: '2 weeks ago',
  },
  {
    input: date - 3000000000,
    output: '1 month ago',
  },
  {
    input: date - 6000000000,
    output: '2 months ago',
  },
  {
    input: date - 36000000000,
    output: '1 year ago',
  },
  {
    input: date - 64000000000,
    output: '2 years ago',
  },
];

describe('getTimeAgo()', () => {
  it('Returns an error when passing an invalid time value', () => {
    expect(() => getTimeAgo('Date')).toThrow(new Error('Invalid date'));
    expect(() => getTimeAgo('20-20-23')).toThrow(new Error('Invalid date'));
    expect(() => getTimeAgo('1618301456781')).toThrow(
      new Error('Invalid date'),
    );
  });

  timeValuesArr.forEach((item) => {
    const periodName = item.output.replace(/[0-9] | ago/g, '');
    it(`Returns the "${periodName}"`, () => {
      expect(getTimeAgo(item.input)).toEqual(item.output);
    });
  });
});
