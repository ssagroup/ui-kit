import { DateTime } from 'luxon';

import {
  buildMonthWeeks,
  formatHourLabel,
  formatTime,
  groupEventsByDay,
  isWholeDay,
  layoutDayEvents,
  MAX_SPAN_DAYS,
  normalizeEvent,
} from './utils';

describe('Calendar utils', () => {
  describe('buildMonthWeeks', () => {
    // October 2026 starts on a Thursday and ends on a Saturday.
    const october = DateTime.fromISO('2026-10-15');

    it('pads whole Monday-first weeks with the neighbouring months', () => {
      const weeks = buildMonthWeeks(october, 7, october);
      expect(weeks).toHaveLength(5);
      expect(weeks[0].days[0].key).toBe('2026-09-28');
      expect(weeks[0].days[0].isCurrentMonth).toBe(false);
      expect(weeks[0].days[3].key).toBe('2026-10-01');
      expect(weeks[4].days[6].key).toBe('2026-11-01');
    });

    it('drops a five-day row that holds only padding', () => {
      // August 2026 starts on a Saturday: its first Mon–Fri row is all July.
      const august = DateTime.fromISO('2026-08-10');
      const weeks = buildMonthWeeks(august, 5, august);
      expect(weeks[0].days[0].key).toBe('2026-08-03');
      expect(weeks.every((week) => week.days.length === 5)).toBe(true);
    });

    it('flags today and weekends', () => {
      const weeks = buildMonthWeeks(october, 7, october);
      const days = weeks.flatMap((week) => week.days);
      expect(days.filter((day) => day.isToday).map((day) => day.key)).toEqual([
        '2026-10-15',
      ]);
      expect(days.find((day) => day.key === '2026-10-17')?.isWeekend).toBe(
        true,
      );
    });
  });

  describe('normalizeEvent', () => {
    it('gives a timed event without an end 30 minutes', () => {
      const item = normalizeEvent({
        id: 1,
        title: 'A',
        start: '2026-10-12T09:00',
      });
      expect(item?.end.toISO()).toContain('T09:30');
    });

    it('ignores an end before the start', () => {
      const item = normalizeEvent({
        id: 1,
        title: 'A',
        start: '2026-10-12T09:00',
        end: '2026-10-12T08:00',
      });
      expect(item?.end.toISO()).toContain('T09:30');
    });

    it('drops an unparsable start', () => {
      expect(normalizeEvent({ id: 1, title: 'A', start: 'nope' })).toBe(
        undefined,
      );
    });
  });

  it('groups by day, untimed entries first, then by start time', () => {
    const byDay = groupEventsByDay([
      { id: 'late', title: 'Late', start: '2026-10-12T15:00' },
      { id: 'early', title: 'Early', start: '2026-10-12T08:00' },
      { id: 'log', title: 'Log', start: '2026-10-12', allDay: true },
      { id: 'other', title: 'Other', start: new Date(2026, 9, 13, 10) },
    ]);
    expect(byDay.get('2026-10-12')?.map((item) => item.event.id)).toEqual([
      'log',
      'early',
      'late',
    ]);
    expect(byDay.get('2026-10-13')).toHaveLength(1);
  });

  describe('multi-day entries', () => {
    const days = (byDay: Map<string, { dayOfSpan: number }[]>) =>
      [...byDay].map(([key, list]) => [key, list[0].dayOfSpan]);

    it('repeats an untimed entry up to its end day, inclusive', () => {
      const byDay = groupEventsByDay([
        {
          id: 1,
          title: 'Conference',
          start: '2026-10-12',
          end: '2026-10-14',
          allDay: true,
        },
      ]);
      expect(days(byDay)).toEqual([
        ['2026-10-12', 1],
        ['2026-10-13', 2],
        ['2026-10-14', 3],
      ]);
      expect(byDay.get('2026-10-13')![0].spanDays).toBe(3);
    });

    it('keeps an untimed entry with an earlier end on its start day', () => {
      const item = normalizeEvent({
        id: 1,
        title: 'A',
        start: '2026-10-12',
        end: '2026-10-10',
        allDay: true,
      });
      expect(item?.spanDays).toBe(1);
    });

    it('repeats timed entries of 24 hours or more, not shorter ones', () => {
      const byDay = groupEventsByDay([
        {
          id: 'trip',
          title: 'Trip',
          start: '2026-10-12T18:00',
          end: '2026-10-14T09:00',
        },
        {
          id: 'shift',
          title: 'Night shift',
          start: '2026-10-12T22:00',
          end: '2026-10-13T06:00',
        },
      ]);
      expect(byDay.get('2026-10-14')!.map((i) => i.event.id)).toEqual(['trip']);
      expect(byDay.get('2026-10-13')!.map((i) => i.event.id)).toEqual(['trip']);
    });

    it('does not reach into a day it ends at the start of', () => {
      const byDay = groupEventsByDay([
        {
          id: 1,
          title: 'Two days',
          start: '2026-10-12T00:00',
          end: '2026-10-14T00:00',
        },
      ]);
      expect([...byDay.keys()]).toEqual(['2026-10-12', '2026-10-13']);
    });

    it('caps how many days an entry is repeated on', () => {
      const byDay = groupEventsByDay([
        {
          id: 1,
          title: 'Typo',
          start: '2026-10-12',
          end: '2126-10-12',
          allDay: true,
        },
      ]);
      expect(byDay.size).toBe(MAX_SPAN_DAYS);
    });

    it('lists continuing entries first on later days', () => {
      const byDay = groupEventsByDay([
        { id: 'log', title: 'Log', start: '2026-10-13', allDay: true },
        { id: 'early', title: 'Early', start: '2026-10-13T08:00' },
        {
          id: 'trip',
          title: 'Trip',
          start: '2026-10-12',
          end: '2026-10-13',
          allDay: true,
        },
      ]);
      expect(byDay.get('2026-10-13')!.map((i) => i.event.id)).toEqual([
        'trip',
        'log',
        'early',
      ]);
    });

    it('keeps days it fills off the timeline', () => {
      const day = DateTime.fromISO('2026-10-13');
      const items = groupEventsByDay([
        {
          id: 'trip',
          title: 'Trip',
          start: '2026-10-12T18:00',
          end: '2026-10-14T09:00',
        },
      ]);
      const [middle] = items.get('2026-10-13')!;
      expect(isWholeDay(middle, day)).toBe(true);
      expect(layoutDayEvents([middle], day)).toHaveLength(0);

      const [last] = items.get('2026-10-14')!;
      const lastDay = DateTime.fromISO('2026-10-14');
      expect(isWholeDay(last, lastDay)).toBe(false);
      expect(layoutDayEvents([last], lastDay)[0]).toMatchObject({
        startMinutes: 0,
        durationMinutes: 9 * 60,
      });
    });
  });

  it('formats times and hour labels for both clocks', () => {
    const time = DateTime.fromISO('2026-10-12T14:05');
    expect(formatTime(time, '24h')).toBe('14:05');
    expect(formatTime(time, '12h')).toBe('02:05 PM');
    expect(formatHourLabel(0, '24h')).toBe('00:00');
    expect(formatHourLabel(13, '12h')).toBe('1 PM');
  });

  describe('layoutDayEvents', () => {
    const day = DateTime.fromISO('2026-10-12');
    const layout = (
      ranges: [string, string][],
    ): { column: number; columns: number }[] => {
      const items = groupEventsByDay(
        ranges.map(([start, end], i) => ({
          id: i,
          title: `${i}`,
          start: `2026-10-12T${start}`,
          end: `2026-10-12T${end}`,
        })),
      ).get('2026-10-12')!;
      return layoutDayEvents(items, day).map(({ column, columns }) => ({
        column,
        columns,
      }));
    };

    it('gives back-to-back events the full width', () => {
      expect(
        layout([
          ['09:00', '10:00'],
          ['10:00', '11:00'],
        ]),
      ).toEqual([
        { column: 0, columns: 1 },
        { column: 0, columns: 1 },
      ]);
    });

    it('puts overlapping events side by side and reuses free columns', () => {
      expect(
        layout([
          ['09:00', '11:00'],
          ['09:30', '10:00'],
          ['10:00', '10:30'],
        ]),
      ).toEqual([
        { column: 0, columns: 2 },
        { column: 1, columns: 2 },
        { column: 1, columns: 2 },
      ]);
    });

    it('places by minutes from midnight and clips at the end of the day', () => {
      const items = groupEventsByDay([
        {
          id: 1,
          title: 'Late',
          start: '2026-10-12T23:00',
          end: '2026-10-13T01:00',
        },
      ]).get('2026-10-12')!;
      const [entry] = layoutDayEvents(items, day);
      expect(entry.startMinutes).toBe(23 * 60);
      expect(entry.durationMinutes).toBe(60);

      // The next day gets the rest, from midnight.
      const next = layoutDayEvents(items, day.plus({ days: 1 }));
      expect(next).toHaveLength(1);
      expect(next[0].startMinutes).toBe(0);
      expect(next[0].durationMinutes).toBe(60);
    });

    it('skips entries that are not on the day', () => {
      const items = groupEventsByDay([
        { id: 1, title: 'Before', start: '2026-10-11T09:00' },
        { id: 2, title: 'After', start: '2026-10-13T09:00' },
      ]);
      const all = [...items.get('2026-10-11')!, ...items.get('2026-10-13')!];
      expect(layoutDayEvents(all, day)).toHaveLength(0);
    });

    // Tests run in Europe/London, where clocks change on these days.
    it('places by the clock on DST days, matching the hour labels', () => {
      const springForward = DateTime.fromISO('2026-03-29');
      const fallBack = DateTime.fromISO('2026-10-25');
      const at = (date: DateTime, time: string) =>
        groupEventsByDay([
          { id: time, title: time, start: `${date.toISODate()}T${time}` },
        ]).get(date.toISODate()!)!;

      expect(
        layoutDayEvents(at(springForward, '05:00'), springForward)[0]
          .startMinutes,
      ).toBe(5 * 60);
      expect(
        layoutDayEvents(at(fallBack, '05:00'), fallBack)[0].startMinutes,
      ).toBe(5 * 60);
    });

    it('labels every hour, even one skipped by DST', () => {
      const labels = Array.from({ length: 24 }, (_, hour) =>
        formatHourLabel(hour, '24h'),
      );
      expect(new Set(labels).size).toBe(24);
    });
  });
});
