import { dateFormatters } from './index';
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

describe('dates', () => {
  describe('dateFormatters', () => {
    const testDateMs = 1681228541711; // 2023-04-11 16:55 GMT+0

    describe('formatTime()', () => {
      it('formats epoch ms as a time string', () => {
        const result = dateFormatters.formatTime(testDateMs);
        expect(result).toEqual('04:55 PM');
      });
    });

    describe('formatDayOfWeek()', () => {
      it('formats epoch ms as a day of week string', () => {
        const result = dateFormatters.formatDayOfWeek(testDateMs);
        expect(result).toEqual('Tue');
      });
    });

    describe('formatDate()', () => {
      it('formats epoch ms as a date string', () => {
        const result = dateFormatters.formatDate(testDateMs);
        expect(result).toEqual('Apr 11');
      });
    });

    describe('printDayOfTheWeek()', () => {
      it('translate getDay() code to string', () => {
        const sunday = dateFormatters.printDayOfTheWeek(0);
        expect(sunday).toEqual('Sun');

        const monday = dateFormatters.printDayOfTheWeek(1);
        expect(monday).toEqual('Mon');

        const tuesday = dateFormatters.printDayOfTheWeek(2);
        expect(tuesday).toEqual('Tue');

        const wednesday = dateFormatters.printDayOfTheWeek(3);
        expect(wednesday).toEqual('Wed');

        const thursday = dateFormatters.printDayOfTheWeek(4);
        expect(thursday).toEqual('Thu');

        const friday = dateFormatters.printDayOfTheWeek(5);
        expect(friday).toEqual('Fri');

        const saturday = dateFormatters.printDayOfTheWeek(6);
        expect(saturday).toEqual('Sat');
      });
    });
  });

  describe('timeAgo', () => {
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
  });
});
