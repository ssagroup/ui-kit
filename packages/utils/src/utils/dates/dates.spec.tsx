import { dateFormatters } from './index';

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
});
