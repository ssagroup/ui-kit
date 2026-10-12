import { useRef, useState } from 'react';
import { DateTime } from 'luxon';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';
import { IconButton } from '@components/IconButton';

import { Calendar } from './Calendar';
import { CalendarEventDetails } from './CalendarEventDetails';
import {
  CalendarColor,
  CalendarDayProps,
  CalendarEvent,
  CalendarRange,
  CalendarView,
} from './types';

const COLORS: CalendarColor[] = [
  'purple',
  'blue',
  'lightBlue',
  'turquoise',
  'cyan',
  'green',
  'yellow',
  'orange',
  'red',
];

const today = DateTime.now().startOf('day');
const logAdd = (date: Date) => console.log('add', date);
const monthStart = today.startOf('month');
const at = (day: DateTime, time: string) => `${day.toISODate()}T${time}`;
const isWorkday = (day: DateTime) => day.weekday <= 5;

/** Every working day of the month, skipping the dates in `except`. */
const workdays = (except: number[] = []) => {
  const days: DateTime[] = [];
  for (
    let d = monthStart;
    d.hasSame(monthStart, 'month');
    d = d.plus({ days: 1 })
  ) {
    if (isWorkday(d) && !except.includes(d.day)) days.push(d);
  }
  return days;
};

// ─── Events calendar ────────────────────────────────────────────────────────

const meetingTitles = ['Standup', 'Design review', 'Planning', '1:1', 'Retro'];

const regularEvents: CalendarEvent[] = workdays().flatMap((day, index) => {
  const list: CalendarEvent[] = [
    {
      id: `standup-${day.day}`,
      title: 'Standup',
      start: at(day, '09:30'),
      end: at(day, '09:45'),
      color: 'purple',
    },
  ];
  if (index % 2 === 0) {
    list.push({
      id: `meeting-${day.day}`,
      title: meetingTitles[index % meetingTitles.length],
      start: at(day, '13:00'),
      end: at(day, '14:00'),
      color: COLORS[(index + 1) % COLORS.length],
    });
  }
  if (index % 3 === 0) {
    list.push({
      id: `task-${day.day}`,
      title: 'Send report',
      start: day.toISODate() ?? '',
      allDay: true,
      kind: 'task',
      completed: index % 2 === 0,
      color: 'green',
    });
  }
  if (index === 4) {
    list.push(
      ...['Interview', 'Demo', 'Coffee chat', 'Workshop'].map((title, i) => ({
        id: `busy-${i}`,
        title,
        start: at(day, `${15 + i}:00`),
        color: COLORS[i + 3],
      })),
    );
  }
  return list;
});

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    view: { options: ['month', 'day'], control: { type: 'inline-radio' } },
    variant: {
      options: ['events', 'timeTracker'],
      control: { type: 'inline-radio' },
    },
    weekdays: { options: [5, 7], control: { type: 'inline-radio' } },
    timeFormat: { options: ['24h', '12h'], control: { type: 'inline-radio' } },
    dayHeader: {
      options: ['monthYear', 'weekday'],
      control: { type: 'inline-radio' },
    },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Calendar>;

/**
 * A plain calendar. Timed entries lead with their start time; tasks get a
 * checkbox; a busy day collapses into "+N more". Hover a day for its add
 * button.
 */
export const Events: Story = {
  render: function Render(args) {
    const [events, setEvents] = useState(regularEvents);
    return (
      <Calendar
        {...args}
        events={events}
        onAddEvent={(date) =>
          setEvents((list) => [
            ...list,
            {
              id: `new-${list.length}`,
              title: 'New event',
              start: date,
              allDay: true,
              color: 'orange',
            },
          ])
        }
        onEventClick={(event) => console.log('event', event)}
        onTaskToggle={(task, completed) =>
          setEvents((list) =>
            list.map((item) =>
              item.id === task.id ? { ...item, completed } : item,
            ),
          )
        }
      />
    );
  },
};

// ─── Time tracker ───────────────────────────────────────────────────────────

const activities = ['Development', 'Code review', 'Meetings', 'Support'];
const leave: Record<number, CalendarDayProps['highlight']> = {
  3: { color: 'yellow', icon: 'vacation', label: 'Vacation', trailing: '8:00' },
  9: { color: 'red', icon: 'day-off', label: 'Day Off', trailing: '8:00' },
  16: { color: 'purple', icon: 'party', label: 'Holiday', trailing: '8:00' },
  22: {
    color: 'turquoise',
    icon: 'sick-leave',
    label: 'Sick Leave',
    trailing: '8:00',
  },
};
const leaveDays = Object.keys(leave).map(Number);

type TimeLog = { hours: number };

const timeLogs: CalendarEvent<TimeLog>[] = workdays(leaveDays)
  .filter((day) => day <= today)
  .flatMap((day, index) => {
    const split = index % 3 === 0 ? [8] : index % 3 === 1 ? [5, 3] : [4, 2, 2];
    return split.map((hours, i) => ({
      id: `log-${day.day}-${i}`,
      title: activities[(index + i) % activities.length],
      start: day.toISODate() ?? '',
      allDay: true,
      color: COLORS[(index + i) % COLORS.length],
      trailing: `${hours}:00`,
      data: { hours },
    }));
  });

const sumHours = (events: CalendarEvent<TimeLog>[]) =>
  events.reduce((total, event) => total + (event.data?.hours ?? 0), 0);

/** Leave days count as 8 hours each in this example. */
const weekHours = (week: { days: Date[]; events: CalendarEvent<TimeLog>[] }) =>
  sumHours(week.events) +
  week.days.filter((date) => {
    const day = DateTime.fromJSDate(date);
    return day.hasSame(monthStart, 'month') && leaveDays.includes(day.day);
  }).length *
    8;

const reported = sumHours(timeLogs) + leaveDays.length * 8;

/**
 * The PeopleOps time tracker built from the generic pieces: untimed entries
 * with their durations in `trailing`, leave days as `getDayProps`
 * highlights, weekly totals via `renderWeekTotal` and a `footer`.
 */
export const TimeTracker: Story = {
  args: { variant: 'timeTracker', weekdays: 7 },
  render: (args) => (
    <Calendar<TimeLog>
      {...args}
      events={timeLogs}
      renderWeekTotal={(week) => `${weekHours(week)} hr(s)`}
      footer={
        <>
          <span>
            Monthly Norm: <strong>174:00</strong>
          </span>
          <span>
            Reported <strong>{reported}:00</strong>
          </span>
        </>
      }
      getDayProps={(date) => {
        const day = DateTime.fromJSDate(date);
        if (!day.hasSame(monthStart, 'month')) return undefined;
        return { highlight: leave[day.day] };
      }}
      maxAddDate={today.toJSDate()}
      onAddEvent={(date) => console.log('add', date)}
      onEventClick={(event) => console.log('log', event)}
    />
  ),
};

/** The same, Monday to Friday. The total column grows, as in the design. */
export const TimeTrackerFiveDays: Story = {
  ...TimeTracker,
  args: { variant: 'timeTracker', weekdays: 5 },
};

// ─── Day view ───────────────────────────────────────────────────────────────

const dayEvents: CalendarEvent[] = [
  {
    id: 'log',
    title: 'Development',
    start: today.toISODate() ?? '',
    allDay: true,
    color: 'purple',
    trailing: '2:30',
  },
  {
    id: 'sync',
    title: 'Team sync',
    start: at(today, '09:00'),
    end: at(today, '10:00'),
    color: 'blue',
  },
  {
    id: 'task-1',
    title: 'Prepare release notes',
    start: at(today, '10:00'),
    end: at(today, '11:00'),
    kind: 'task',
    color: 'purple',
  },
  {
    id: 'task-2',
    title: 'Reply to support',
    start: at(today, '11:00'),
    end: at(today, '11:30'),
    kind: 'task',
    completed: true,
    color: 'cyan',
  },
  {
    id: 'quick',
    title: 'Quick call',
    start: at(today, '12:00'),
    end: at(today, '12:15'),
    color: 'orange',
  },
  {
    id: 'review',
    title: 'Design review',
    start: at(today, '14:00'),
    end: at(today, '15:30'),
    color: 'green',
    trailing: '+3',
  },
  {
    id: 'overlap',
    title: 'Interview',
    start: at(today, '14:30'),
    end: at(today, '15:30'),
    color: 'red',
  },
];

/**
 * One day on an hour timeline. Untimed entries and the highlight sit above
 * 00:00; overlapping entries share the width; the line marks the current
 * time. With no height of its own, the view shows twelve hours and scrolls.
 */
export const DayView: Story = {
  args: { view: 'day', dayHeader: 'monthYear', timeFormat: '24h' },
  render: function Render(args) {
    const [events, setEvents] = useState(dayEvents);
    return (
      <Calendar
        {...args}
        events={events}
        getDayProps={() => ({
          highlight: {
            color: 'purple',
            icon: 'party',
            label: 'Company holiday',
          },
        })}
        onAddEvent={(date) => console.log('add', date)}
        onEventClick={(event) => console.log('event', event)}
        onTaskToggle={(task, completed) =>
          setEvents((list) =>
            list.map((item) =>
              item.id === task.id ? { ...item, completed } : item,
            ),
          )
        }
      />
    );
  },
};

/** Weekday header and a 12-hour clock. */
export const DayViewTwelveHour: Story = {
  ...DayView,
  args: { view: 'day', dayHeader: 'weekday', timeFormat: '12h' },
};

/**
 * Left alone, the calendar navigates itself. Click a day number to open it,
 * and the back arrow to return; the toolbar moves between months or days
 * and toggles the view. `toolbarEnd` holds the consumer's own buttons.
 */
export const Navigation: Story = {
  args: { toolbar: true },
  render: (args) => (
    <Calendar
      {...args}
      onAddEvent={logAdd}
      events={[...regularEvents, ...dayEvents]}
      toolbarEnd={
        <Button
          variant="primary"
          size="small"
          text="Create"
          onClick={() => console.log('create')}
        />
      }
      onViewChange={(view) => console.log('view', view)}
      onDateChange={(date) => console.log('date', date)}
    />
  ),
};

/**
 * Controlled: the parent owns `view` and `date`, and feeds the change
 * handlers back in — here to keep them in the URL, say.
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [view, setView] = useState<CalendarView>('month');
    const [date, setDate] = useState<Date>(today.toJSDate());
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span>
          Parent state: <strong>{view}</strong>,{' '}
          <strong>{DateTime.fromJSDate(date).toISODate()}</strong>
        </span>
        <Calendar
          {...args}
          onAddEvent={logAdd}
          toolbar
          view={view}
          date={date}
          onViewChange={setView}
          onDateChange={setDate}
          events={[...regularEvents, ...dayEvents]}
        />
      </div>
    );
  },
};

/**
 * `onRangeChange` reports the days on show — on mount and on every move —
 * so the consumer can fetch them; `loading` marks the calendar busy
 * meanwhile. This fakes a 1-second request.
 */
export const LoadingAndRange: Story = {
  render: function Render(args) {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [range, setRange] = useState('');
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const fetchRange = ({ start, end }: CalendarRange) => {
      setRange(
        `${DateTime.fromJSDate(start).toISODate()} – ${DateTime.fromJSDate(
          end,
        ).toISODate()}`,
      );
      setLoading(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const from = DateTime.fromJSDate(start);
        const days = Math.round(
          DateTime.fromJSDate(end).diff(from, 'days').days,
        );
        setEvents(
          Array.from({ length: days }, (_, i) => from.plus({ days: i }))
            .filter(isWorkday)
            // Keyed off the date, so every range returns the same event
            // for a given day.
            .map((day) => ({
              id: `fetched-${day.toISODate()}`,
              title: meetingTitles[day.ordinal % meetingTitles.length],
              start: at(day, '10:00'),
              end: at(day, '11:00'),
              color: COLORS[day.ordinal % COLORS.length],
            })),
        );
        setLoading(false);
      }, 1000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span>
          Fetching: <strong>{range}</strong>
        </span>
        <Calendar
          {...args}
          onAddEvent={logAdd}
          toolbar
          loading={loading}
          events={events}
          onRangeChange={fetchRange}
        />
      </div>
    );
  },
};

// ─── Entry details and custom entries ───────────────────────────────────────

type Meeting = { location: string; organiser: string; notes?: string };

const meetings: CalendarEvent<Meeting>[] = regularEvents.map((event, i) => ({
  ...event,
  data: {
    location: i % 2 ? 'Room 4' : 'Online',
    organiser: i % 3 ? 'Olena K.' : 'Andrii P.',
    notes:
      i % 4 === 0 ? 'Bring the latest numbers.\nAgenda in the doc.' : undefined,
  },
}));

/**
 * `renderEventDetails` with `CalendarEventDetails`: the calendar opens the
 * card next to the clicked entry (or centred, with
 * `eventDetailsDisplay="modal"`) and closes it on Escape, a click outside or
 * `close()`. Delete removes the entry, which closes its card.
 */
export const EventDetails: Story = {
  args: { eventDetailsDisplay: 'popover' },
  argTypes: {
    eventDetailsDisplay: {
      options: ['popover', 'modal'],
      control: { type: 'inline-radio' },
    },
  },
  render: function Render(args) {
    const [events, setEvents] = useState(meetings);
    return (
      <Calendar<Meeting>
        {...args}
        onAddEvent={logAdd}
        toolbar
        events={events}
        renderEventDetails={(event, { close }) => {
          const start = DateTime.fromISO(String(event.start));
          return (
            <CalendarEventDetails
              title={event.title}
              subtitle={start.toFormat('cccc d')}
              fields={[
                { label: 'Date', value: start.toFormat('dd.MM.yyyy') },
                {
                  label: 'Time',
                  value: event.allDay ? 'All day' : start.toFormat('HH:mm'),
                },
                { label: 'Location', value: event.data?.location },
                { label: 'Organiser', value: event.data?.organiser },
                ...(event.data?.notes
                  ? [
                      {
                        label: 'Notes',
                        value: event.data.notes,
                        fullWidth: true,
                      },
                    ]
                  : []),
              ]}
              onEdit={() => console.log('edit', event)}
              onDelete={() =>
                setEvents((list) => list.filter((e) => e.id !== event.id))
              }
              onClose={close}
            />
          );
        }}
      />
    );
  },
};

/**
 * Three ways to change how entries look:
 * - `renderEventActions` — a remove button, outside the entry's click target
 * - `getEventProps` — a class or style per entry (done tasks fade here)
 * - `renderEvent` with `defaultContent` — wraps the default (the first
 *   standup of each week gets a dashed outline)
 */
export const CustomEntries: Story = {
  render: function Render(args) {
    const [events, setEvents] = useState(regularEvents);
    return (
      <Calendar
        {...args}
        onAddEvent={logAdd}
        events={events}
        onEventClick={(event) => console.log('event', event)}
        onTaskToggle={(task, completed) =>
          setEvents((list) =>
            list.map((item) =>
              item.id === task.id ? { ...item, completed } : item,
            ),
          )
        }
        renderEventActions={(event) => (
          <IconButton
            icon="cross"
            size="small"
            transparent
            aria-label={`Remove ${event.title}`}
            onClick={() =>
              setEvents((list) => list.filter((e) => e.id !== event.id))
            }
          />
        )}
        getEventProps={(event) =>
          event.completed ? { style: { opacity: 0.5 } } : undefined
        }
        renderEvent={(event, { defaultContent }) =>
          String(event.id).startsWith('standup') &&
          DateTime.fromISO(String(event.start)).weekday === 1 ? (
            <div style={{ outline: '1px dashed #9260FC', borderRadius: 6 }}>
              {defaultContent}
            </div>
          ) : undefined
        }
      />
    );
  },
};

/**
 * Given a height — here `height: 100%` of a 500px container — the day view
 * fills it and scrolls inside.
 */
export const DayViewFillsContainer: Story = {
  args: { view: 'day' },
  render: (args) => (
    <div style={{ height: 500 }}>
      <Calendar
        {...args}
        onAddEvent={logAdd}
        style={{ height: '100%' }}
        events={dayEvents}
      />
    </div>
  ),
};
