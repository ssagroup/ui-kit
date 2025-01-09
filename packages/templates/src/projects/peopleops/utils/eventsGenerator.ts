import { DateTime } from 'luxon';
import * as API from '@/peopleops/types';
import { DashboardEventsMock as template } from '@peopleops/hooks/dashboard/__mocks__/dashboardEvents';

const formatDate = (date: Date) =>
  DateTime.fromJSDate(date).toFormat('dd-MM-yyyy');

const getRandomDateInRange = (start: Date, end: Date) => {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
};

export const getTodayBounds = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return { start: startOfDay, end: endOfDay };
};

export const getCurrentWeekBounds = () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfCurrentWeekLuxon = DateTime.now().endOf('week');
  const endOfWeek = endOfCurrentWeekLuxon.toJSDate();
  endOfWeek.setHours(23, 59, 59, 999);

  return { start: startOfToday, end: endOfWeek };
};

export const getNextWeekBounds = () => {
  const startOfNextWeekLuxon = DateTime.now()
    .plus({ weeks: 1 })
    .startOf('week');
  const startOfNextWeek = startOfNextWeekLuxon.toJSDate();
  startOfNextWeek.setHours(0, 0, 0, 0);

  const endOfNextWeekLuxon = startOfNextWeekLuxon.endOf('week');
  const endOfNextWeek = endOfNextWeekLuxon.toJSDate();
  endOfNextWeek.setHours(23, 59, 59, 999);

  return { start: startOfNextWeek, end: endOfNextWeek };
};

export const getCurrentMonthBounds = () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfCurrentMonthLuxon = DateTime.now().endOf('month');
  const endOfMonth = endOfCurrentMonthLuxon.toJSDate();
  endOfMonth.setHours(23, 59, 59, 999);

  return { start: startOfToday, end: endOfMonth };
};

export const getNextMonthBounds = () => {
  const startOfNextMonthLuxon = DateTime.now()
    .plus({ month: 1 })
    .startOf('month');
  const startOfNextMonth = startOfNextMonthLuxon.toJSDate();
  startOfNextMonth.setHours(0, 0, 0, 0);

  const endOfNextMonthLuxon = startOfNextMonthLuxon.endOf('month');
  const endOfNextMonth = endOfNextMonthLuxon.toJSDate();
  endOfNextMonth.setHours(23, 59, 59, 999);

  return { start: startOfNextMonth, end: endOfNextMonth };
};

// TODO: add sorting by date ASK
const updateEventDates = (
  events: Array<API.EventItemInfo>,
  dateRange: { start: Date; end: Date },
) => {
  const { start, end } = dateRange;

  const updatedEvents = events.map((event) => {
    const randomDate = getRandomDateInRange(start, end);
    return {
      ...event,
      eventDate: formatDate(randomDate),
    };
  });

  return updatedEvents;
};

// type EventPeriods = keyof typeof template;
// type EventTypes = keyof (typeof template)['today'];

export const getFilledTemplate = () => {
  // const cache: Record<
  //   EventPeriods,
  //   Record<EventTypes, API.EventItemInfo[]>
  // > = {} as Record<EventPeriods, Record<EventTypes, API.EventItemInfo[]>>;
  const dateRanges: API.DateRanges = {
    today: getTodayBounds(),
    thisWeek: getCurrentWeekBounds(),
    nextWeek: getNextWeekBounds(),
    thisMonth: getCurrentMonthBounds(),
    nextMonth: getNextMonthBounds(),
  };

  const updateSection = (
    section: API.DashboardEvent,
    dateRangeKey: API.DateRangesKeys,
  ) => {
    const dateRange = dateRanges[dateRangeKey];
    return {
      ...section,
      birthdays: updateEventDates(section.birthdays, dateRange),
      anniversaries: updateEventDates(section.anniversaries, dateRange),
      assessments: updateEventDates(section.assessments, dateRange),
    };
  };

  const result = {
    today: updateSection(template.today, 'today'),
    thisWeek: updateSection(template.thisWeek, 'thisWeek'),
    nextWeek: updateSection(template.nextWeek, 'nextWeek'),
    thisMonth: updateSection(template.thisMonth, 'thisMonth'),
    nextMonth: updateSection(template.nextMonth, 'nextMonth'),
  };

  return result;
};
