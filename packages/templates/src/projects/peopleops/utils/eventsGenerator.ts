import { DateTime, Interval } from 'luxon';
import * as API from '@/peopleops/types';
import { DashboardEventsMock as template } from '@peopleops/hooks/dashboard/__mocks__/dashboardEvents';
import { Period } from '../components/Events/types';

const DATE_FORMAT = 'dd-MM-yyyy';

const formatDate = (date: Date) =>
  DateTime.fromJSDate(date).toFormat(DATE_FORMAT);

const getRandomDateInRange = (start: Date, end: Date) => {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
};

export const getTodayBounds = () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return { start: startOfToday, end: endOfDay };
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

const updateEventDates = (
  events: Array<API.EventItemInfo>,
  dateRange: { start: Date; end: Date },
) => {
  const { start, end } = dateRange;
  const dates = events.map(() => getRandomDateInRange(start, end));
  const updatedEvents = events.map((event, index) => {
    return {
      ...event,
      eventDate: formatDate(dates[index]),
    };
  });

  return updatedEvents;
};

const sortEvent = (item1: API.EventItemInfo, item2: API.EventItemInfo) => {
  const date1splitted = item1.eventDate.split('-');
  const date2splitted = item2.eventDate.split('-');
  const ms1 = new Date(
    Number(date1splitted[2]),
    Number(date1splitted[1]) - 1,
    Number(date1splitted[0]),
  ).getTime();
  const ms2 = new Date(
    Number(date2splitted[2]),
    Number(date2splitted[1]) - 1,
    Number(date2splitted[0]),
  ).getTime();
  return ms1 - ms2 > 0 ? 1 : ms2 === ms1 ? 0 : -1;
};

export const getFilledTemplate = () => {
  const cache: Array<
    API.EventItemInfo & {
      eventInfoType: API.EventInfoType;
    }
  > = [];
  const dateRanges: API.DateRanges = {
    today: getTodayBounds(),
    thisWeek: getCurrentWeekBounds(),
    nextWeek: getNextWeekBounds(),
    thisMonth: getCurrentMonthBounds(),
    nextMonth: getNextMonthBounds(),
  };

  const processCache = (
    items: API.EventItemInfo[],
    eventInfoType: API.EventInfoType,
  ) =>
    items.map((item) => {
      const foundItem = cache.find(
        (cacheItem) =>
          cacheItem.eventInfoType === eventInfoType &&
          cacheItem.personId === item.personId,
      );
      if (foundItem) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { eventInfoType, ...rest } = foundItem;
        return rest;
      } else {
        cache.push({
          eventInfoType,
          ...item,
        });
        return item;
      }
    });

  const updateSection = (
    section: API.DashboardEvent,
    dateRangeKey: API.DateRangesKeys,
  ) => {
    const dateRange = dateRanges[dateRangeKey];
    const newData = {
      ...section,
      birthdays: updateEventDates(section.birthdays, dateRange),
      anniversaries: updateEventDates(section.anniversaries, dateRange),
      assessments: updateEventDates(section.assessments, dateRange),
    };
    (Object.keys(newData) as Array<API.EventInfoType>).forEach(
      (eventInfoType) => {
        newData[eventInfoType] = processCache(
          newData[eventInfoType],
          eventInfoType,
        );
      },
    );
    return newData;
  };

  const result: Record<Period, API.EventInfo> = {} as Record<
    Period,
    API.EventInfo
  >;

  (Object.keys(template) as Array<Period>).forEach((periodType) => {
    result[periodType] = updateSection(template[periodType], periodType);

    const currentDateRange = dateRanges[periodType];
    const currentInterval = Interval.fromDateTimes(
      DateTime.fromJSDate(currentDateRange.start),
      DateTime.fromJSDate(currentDateRange.end),
    );
    cache
      .filter((item) =>
        currentInterval.contains(
          DateTime.fromFormat(item.eventDate, DATE_FORMAT),
        ),
      )
      .forEach(({ eventInfoType, ...rest }) => {
        if (
          !result[periodType][eventInfoType].find(
            (item) => item.personId === rest.personId,
          )
        ) {
          result[periodType][eventInfoType].push(rest);
        }
      });
    (Object.keys(template[periodType]) as API.EventInfoType[]).map(
      (eventInfoType) => {
        result[periodType][eventInfoType].sort(sortEvent);
      },
    );
  });

  return result;
};
