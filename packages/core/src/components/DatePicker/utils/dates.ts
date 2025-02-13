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

export const processDate = (
  dateParts: {
    month: string;
    day: string;
    year: string;
  },
  yearMin: number,
  yearMax: number,
) => {
  const yearMinStr = yearMin.toString();
  const yearMaxStr = yearMax.toString();
  const { day, month, year } = dateParts;
  if (typeof month === 'string' && month.length === 2) {
    const monthN = Number(month);
    if (monthN < 1 || monthN > 12) {
      return false;
    }
  }
  if (typeof day === 'string' && day.length === 2) {
    const dayN = Number(day);
    if (dayN < 1 || dayN > 31) {
      return false;
    }
  }
  if (typeof year === 'string' && year.length > 0) {
    const yearN = Number(year);
    const yearMinPart = Number(yearMinStr.slice(0, year.length));
    const yearMaxPart = Number(yearMaxStr.slice(0, year.length));

    if (yearN < yearMinPart || yearN >= yearMaxPart) {
      return false;
    }
  }
  return true;
};
