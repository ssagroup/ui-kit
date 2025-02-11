import { DateTime } from 'luxon';

export const getDaysForCalendarMonth = (date?: Date) => {
  if (!date) {
    return [];
  }
  const firstDayOfMonth = DateTime.fromJSDate(date).startOf('month');
  const firstDayOfCal = firstDayOfMonth.startOf('week');
  const lastDayOfMonth = firstDayOfMonth.endOf('month');
  const lastDayOfCal = lastDayOfMonth.endOf('week');
  const days = [firstDayOfCal.toJSDate()];
  let temp = firstDayOfCal;
  while (temp.toMillis() < lastDayOfCal.toMillis() && days.length < 42) {
    temp = temp.plus({ days: 1 });
    days.push(temp.toJSDate());
  }
  while (days.length < 42) {
    temp = temp.plus({ days: 1 });
    days.push(temp.toJSDate());
  }
  return days;
};

export const getWeekDays = () => {
  const firstDayOfMonth = DateTime.fromJSDate(new Date()).startOf('month');
  const firstDayOfWeek = firstDayOfMonth.startOf('week');
  const lastDayOfWeek = firstDayOfMonth.endOf('week');
  const days = [firstDayOfWeek.toFormat('ccccc')];
  let temp = firstDayOfWeek;
  while (temp.toMillis() < lastDayOfWeek.toMillis()) {
    temp = temp.plus({ days: 1 });
    days.push(temp.toFormat('ccccc'));
  }
  days.pop();
  return days;
};

export const getYearsList = (props?: {
  yearsFrom?: number;
  yearsCount?: number;
}) => {
  const { yearsFrom = 1900, yearsCount = 250 } = props || {};
  return Array.from(
    { length: yearsCount },
    (value, index) => yearsFrom + index,
  );
};
