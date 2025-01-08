import * as API from '@/peopleops/types';
import { DashboardEventsMock as template } from '@peopleops/hooks/dashboard/__mocks__/dashboardEvents';

const formatDate = (date: Date) => date.toLocaleDateString('en-GB');

const getRandomDateInRange = (start: Date, end: Date) => {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
};

const getWeekBounds = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() - date.getDay() + 7); // Sunday
  endOfWeek.setHours(23, 59, 59, 999);

  return { start: startOfWeek, end: endOfWeek };
};

const getMonthBounds = (date: Date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  return { start: startOfMonth, end: endOfMonth };
};

const updateEventDates = (
  events: Array<API.EventItemInfo>,
  dateRange: { start: Date; end: Date },
) => {
  const { start, end } = dateRange;

  return events.map((event) => {
    const randomDate = getRandomDateInRange(start, end);
    return {
      ...event,
      eventDate: formatDate(randomDate),
    };
  });
};

export const getFilledTemplate = () => {
  const today = new Date();
  const dateRanges: API.DateRanges = {
    today: { start: today, end: today },
    thisWeek: getWeekBounds(today),
    nextWeek: getWeekBounds(new Date(today.setDate(today.getDate() + 7))),
    thisMonth: getMonthBounds(today),
    nextMonth: getMonthBounds(new Date(today.setMonth(today.getMonth() + 1))),
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

  return {
    today: {
      ...template.today,
      assessments: updateEventDates(
        template.today.assessments,
        dateRanges.today,
      ),
    },
    thisWeek: updateSection(template.thisWeek, 'thisWeek'),
    nextWeek: updateSection(template.nextWeek, 'nextWeek'),
    thisMonth: updateSection(template.thisMonth, 'thisMonth'),
    nextMonth: updateSection(template.nextMonth, 'nextMonth'),
  };
};
