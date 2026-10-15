import React from 'react';
import userEvent from '@testing-library/user-event';

import { Calendar } from './Calendar';
import { CalendarEventDetails } from './CalendarEventDetails';
import { CalendarEvent, CalendarWeek } from './types';
import { screen, within } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

// Thursday 15 October 2026, 10:00.
const NOW = new Date(2026, 9, 15, 10, 0);

const setup = (ui: React.ReactElement) => ({
  user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
  ...render(ui),
});

const day = (name: RegExp) => screen.getByRole('group', { name });

const events: CalendarEvent[] = [
  {
    id: 'log',
    title: 'Development',
    start: '2026-10-12',
    allDay: true,
    trailing: '2:30',
  },
  {
    id: 'standup',
    title: 'Standup',
    start: '2026-10-12T09:30',
    end: '2026-10-12T09:45',
    color: 'purple',
  },
  {
    id: 'review',
    title: 'Review',
    start: '2026-10-12T13:00',
    end: '2026-10-12T14:00',
  },
  { id: 'demo', title: 'Demo', start: '2026-10-12T15:00' },
  { id: 'retro', title: 'Retro', start: '2026-10-12T16:00' },
];

describe('Calendar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('month view', () => {
    it('renders Monday-first weekday columns and marks today', () => {
      setup(<Calendar date={NOW} />);
      const headers = ['Monday', 'Tuesday', 'Sunday'];
      headers.forEach((name) =>
        expect(screen.getByText(name)).toBeInTheDocument(),
      );
      expect(
        within(day(/Thursday, 15 October 2026/)).getByText('15'),
      ).toHaveAttribute('aria-current', 'date');
    });

    it('drops the weekend columns with five weekdays', () => {
      setup(<Calendar date={NOW} weekdays={5} />);
      expect(screen.queryByText('Saturday')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('group', { name: /Saturday/ }),
      ).not.toBeInTheDocument();
    });

    it('lists timed entries with their start time and shows trailing', () => {
      setup(<Calendar date={NOW} events={events} />);
      const monday = day(/Monday, 12 October/);
      expect(within(monday).getByText('09:30')).toBeInTheDocument();
      expect(within(monday).getByText('2:30')).toBeInTheDocument();
    });

    it('uses the 12-hour clock when asked', () => {
      setup(<Calendar date={NOW} events={events} timeFormat="12h" />);
      expect(
        within(day(/Monday, 12 October/)).getByText('09:30 AM'),
      ).toBeInTheDocument();
    });

    it('collapses entries past the limit into a "+N more" popover', async () => {
      const onEventClick = jest.fn();
      const { user } = setup(
        <Calendar date={NOW} events={events} onEventClick={onEventClick} />,
      );
      const monday = day(/Monday, 12 October/);
      // Untimed first, then by start: Development, Standup, Review shown.
      expect(within(monday).getByText('Review')).toBeInTheDocument();
      expect(within(monday).queryByText('Demo')).not.toBeInTheDocument();

      await user.click(within(monday).getByRole('button', { name: /2 more/ }));
      const demo = await screen.findByRole('button', { name: /Demo/ });
      expect(screen.getByText('Monday, 12')).toBeInTheDocument();

      await user.click(demo);
      // The popover closes, so the "+N more" button is the anchor.
      expect(onEventClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'demo' }),
        { anchor: within(monday).getByRole('button', { name: /2 more/ }) },
      );
      expect(screen.queryByText('Monday, 12')).not.toBeInTheDocument();
    });

    it('honours maxEventsPerDay', () => {
      setup(<Calendar date={NOW} events={events} maxEventsPerDay={1} />);
      expect(
        within(day(/Monday, 12 October/)).getByRole('button', {
          name: /4 more/,
        }),
      ).toBeInTheDocument();
    });

    it('adds a total column and footer only in the timeTracker variant', () => {
      const renderWeekTotal = jest.fn<string, [CalendarWeek]>(() => 'TOTAL');
      const { rerender } = setup(
        <Calendar
          date={NOW}
          events={events}
          renderWeekTotal={renderWeekTotal}
          footer="Norm"
        />,
      );
      expect(screen.queryByText('Total')).not.toBeInTheDocument();
      expect(renderWeekTotal).not.toHaveBeenCalled();
      expect(screen.getByText('Norm')).toBeInTheDocument();

      rerender(
        <Calendar
          date={NOW}
          events={events}
          variant="timeTracker"
          renderWeekTotal={renderWeekTotal}
          totalLabel="Total"
        />,
      );
      expect(screen.getByText('Total')).toBeInTheDocument();
      // October 2026 spans five week rows.
      expect(screen.getAllByText('TOTAL')).toHaveLength(5);
      const week = renderWeekTotal.mock.calls.find(
        ([w]) => w.events.length > 0,
      )![0];
      expect(week.events).toHaveLength(events.length);
      expect(week.days).toHaveLength(7);
    });

    it('renders a whole-day highlight from getDayProps', () => {
      setup(
        <Calendar
          date={NOW}
          events={events}
          getDayProps={(date) =>
            date.getDate() === 12 && date.getMonth() === 9
              ? {
                  highlight: {
                    color: 'yellow',
                    icon: 'vacation',
                    label: 'Vacation',
                    trailing: '8:00',
                  },
                }
              : undefined
          }
        />,
      );
      const monday = day(/Monday, 12 October/);
      expect(within(monday).getByText('Vacation')).toBeInTheDocument();
      expect(within(monday).getByText('8:00')).toBeInTheDocument();
      // The highlight takes one of the three rows.
      expect(
        within(monday).getByRole('button', { name: /3 more/ }),
      ).toBeInTheDocument();
    });

    it('adds to a day, but not to padding days or disabled ones', async () => {
      const onAddEvent = jest.fn();
      const { user } = setup(
        <Calendar
          date={NOW}
          onAddEvent={onAddEvent}
          getDayProps={(date) => ({ disableAdd: date > NOW })}
        />,
      );
      await user.click(
        screen.getByRole('button', { name: 'Add to Monday, 12 October 2026' }),
      );
      expect(onAddEvent).toHaveBeenCalledWith(new Date(2026, 9, 12));

      expect(
        screen.queryByRole('button', { name: /Add to Monday, 28 September/ }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /Add to Friday, 16 October/ }),
      ).not.toBeInTheDocument();
    });

    it('limits the add button to minAddDate–maxAddDate', () => {
      const { rerender } = setup(
        <Calendar
          date={NOW}
          onAddEvent={() => {}}
          minAddDate="2026-10-12"
          maxAddDate={NOW}
        />,
      );
      const addTo = (name: string) =>
        screen.queryByRole('button', { name: `Add to ${name}` });
      expect(addTo('Sunday, 11 October 2026')).not.toBeInTheDocument();
      expect(addTo('Monday, 12 October 2026')).toBeInTheDocument();
      // Inclusive, by date: today counts even though NOW is 10:00.
      expect(addTo('Thursday, 15 October 2026')).toBeInTheDocument();
      expect(addTo('Friday, 16 October 2026')).not.toBeInTheDocument();

      rerender(
        <Calendar
          view="day"
          date="2026-10-16"
          onAddEvent={() => {}}
          maxAddDate={NOW}
        />,
      );
      expect(addTo('Friday, 16 October 2026')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Add at 09:00' }),
      ).not.toBeInTheDocument();
    });

    it('makes day numbers clickable with onDayClick', async () => {
      const onDayClick = jest.fn();
      const { user } = setup(<Calendar date={NOW} onDayClick={onDayClick} />);
      await user.click(
        within(day(/Tuesday, 13 October/)).getByRole('button', {
          name: /Tuesday, 13/,
        }),
      );
      expect(onDayClick).toHaveBeenCalledWith(new Date(2026, 9, 13));
    });

    it('toggles tasks, and shows them read-only without a handler', async () => {
      const task: CalendarEvent = {
        id: 't',
        title: 'Report',
        start: '2026-10-13',
        allDay: true,
        kind: 'task',
      };
      const onTaskToggle = jest.fn();
      const { user, rerender } = setup(
        <Calendar date={NOW} events={[task]} onTaskToggle={onTaskToggle} />,
      );
      await user.click(
        screen.getByRole('checkbox', { name: 'Mark Report as done' }),
      );
      expect(onTaskToggle).toHaveBeenCalledWith(task, true);

      rerender(<Calendar date={NOW} events={[task]} />);
      expect(
        screen.getByRole('checkbox', { name: 'Mark Report as done' }),
      ).toBeDisabled();
    });

    it('lets renderEvent replace entries, falling back on undefined', () => {
      setup(
        <Calendar
          date={NOW}
          events={events}
          renderEvent={(event, context) =>
            event.id === 'standup' ? (
              <span>custom {context.view}</span>
            ) : undefined
          }
        />,
      );
      expect(screen.getByText('custom month')).toBeInTheDocument();
      expect(screen.getByText('Review')).toBeInTheDocument();
    });

    it('has no axe violations', async () => {
      const { container } = setup(
        <Calendar
          date={NOW}
          events={events}
          variant="timeTracker"
          renderWeekTotal={() => '8 hr(s)'}
          onAddEvent={() => {}}
          onEventClick={() => {}}
          onDayClick={() => {}}
        />,
      );
      jest.useRealTimers();
      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  describe('day view', () => {
    const monday = new Date(2026, 9, 12);

    it('renders the header, 24 hour labels and the day entries', () => {
      setup(<Calendar view="day" date={monday} events={events} />);
      expect(
        screen.getByRole('heading', { name: 'October 2026' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('00:00')).toBeInTheDocument();
      expect(screen.getByText('23:00')).toBeInTheDocument();
      expect(screen.getByText('09:30 – 09:45')).toBeInTheDocument();
      // Untimed: listed above the timeline, with its trailing.
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByText('2:30')).toBeInTheDocument();
    });

    it('shows the weekday header and 12-hour labels', () => {
      setup(
        <Calendar
          view="day"
          date={monday}
          dayHeader="weekday"
          timeFormat="12h"
        />,
      );
      expect(
        screen.getByRole('heading', { name: 'Monday' }),
      ).toBeInTheDocument();
      expect(screen.getByText('12 AM')).toBeInTheDocument();
      expect(screen.getByText('1 PM')).toBeInTheDocument();
    });

    it('places timed entries by time', () => {
      setup(<Calendar view="day" date={monday} events={events} />);
      // The card fills the box that's placed on the timeline.
      const review = screen.getByTitle('Review').parentElement as HTMLElement;
      // 13:00 at 68px an hour, plus half the 5px gap.
      expect(review.style.top).toBe(`${13 * 68 + 2.5}px`);
      expect(review.style.height).toBe(`${68 - 5}px`);
    });

    it('continues an entry past midnight on the next day', () => {
      setup(
        <Calendar
          view="day"
          date="2026-10-13"
          events={[
            {
              id: 'shift',
              title: 'Night shift',
              start: '2026-10-12T22:00',
              end: '2026-10-13T06:00',
            },
          ]}
        />,
      );
      const box = screen.getByTitle('Night shift').parentElement as HTMLElement;
      expect(box.style.top).toBe(`${2.5}px`);
      expect(box.style.height).toBe(`${6 * 68 - 5}px`);
      expect(screen.getByText('22:00 – 06:00')).toBeInTheDocument();
    });

    it('draws the now line only on today', () => {
      const { rerender } = setup(<Calendar view="day" date={monday} />);
      expect(screen.queryByTestId('calendar-now')).not.toBeInTheDocument();
      rerender(<Calendar view="day" date={NOW} />);
      expect(screen.getByTestId('calendar-now').style.top).toBe(`${10 * 68}px`);
    });

    it('shows the day highlight', () => {
      setup(
        <Calendar
          view="day"
          date={monday}
          getDayProps={() => ({
            highlight: { color: 'purple', icon: 'party', label: 'Holiday' },
          })}
        />,
      );
      expect(screen.getByText('Holiday')).toBeInTheDocument();
    });

    it('adds from the header and from an hour', async () => {
      const onAddEvent = jest.fn();
      const { user } = setup(
        <Calendar view="day" date={monday} onAddEvent={onAddEvent} />,
      );
      await user.click(
        screen.getByRole('button', { name: 'Add to Monday, 12 October 2026' }),
      );
      expect(onAddEvent).toHaveBeenLastCalledWith(new Date(2026, 9, 12));
      await user.click(screen.getByRole('button', { name: 'Add at 14:00' }));
      expect(onAddEvent).toHaveBeenLastCalledWith(new Date(2026, 9, 12, 14));
    });

    it('has no axe violations', async () => {
      const { container } = setup(
        <Calendar
          view="day"
          date={NOW}
          events={[
            ...events.map((event) => ({
              ...event,
              start: String(event.start).replace('2026-10-12', '2026-10-15'),
              end:
                event.end &&
                String(event.end).replace('2026-10-12', '2026-10-15'),
            })),
            {
              id: 'task',
              title: 'Task',
              start: '2026-10-15T11:00',
              kind: 'task',
            },
          ]}
          onAddEvent={() => {}}
          onEventClick={() => {}}
          onTaskToggle={() => {}}
        />,
      );
      jest.useRealTimers();
      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  describe('multi-day entries', () => {
    const conference: CalendarEvent = {
      id: 'conf',
      title: 'Conference',
      start: '2026-10-12T09:00',
      end: '2026-10-14T17:00',
    };

    it('repeats the entry on each day, with the time on the first only', () => {
      setup(<Calendar date={NOW} events={[conference]} />);
      const monday = within(day(/Monday, 12 October/));
      expect(monday.getByText('09:00')).toBeInTheDocument();
      expect(monday.getByText(', day 1 of 3')).toBeInTheDocument();

      const tuesday = within(day(/Tuesday, 13 October/));
      expect(tuesday.getByText('Conference')).toBeInTheDocument();
      expect(tuesday.queryByText('09:00')).not.toBeInTheDocument();
      expect(
        within(day(/Wednesday, 14 October/)).getByText(', day 3 of 3'),
      ).toBeInTheDocument();
      expect(
        within(day(/Thursday, 15 October/)).queryByText('Conference'),
      ).not.toBeInTheDocument();
    });

    it('hands the span to renderEvent and counts it once in a week total', () => {
      const renderWeekTotal = jest.fn(
        (week: CalendarWeek) => week.events.length,
      );
      setup(
        <Calendar
          date={NOW}
          variant="timeTracker"
          events={[conference]}
          renderWeekTotal={renderWeekTotal}
          renderEvent={(_, { dayOfSpan, spanDays }) => (
            <span>{`${dayOfSpan}/${spanDays}`}</span>
          )}
        />,
      );
      expect(screen.getByText('2/3')).toBeInTheDocument();
      const week = renderWeekTotal.mock.calls
        .map(([w]) => w)
        .find((w) => w.events.length > 0);
      expect(week?.events).toEqual([conference]);
    });

    it('lists it with the untimed entries on a day it fills', () => {
      setup(<Calendar view="day" date="2026-10-13" events={[conference]} />);
      // A row above the timeline (the only kind that says which day of the
      // span it is), not a box placed on it.
      expect(
        within(screen.getByTitle('Conference')).getByText(', day 2 of 3'),
      ).toBeInTheDocument();
      expect(screen.queryByText(/09:00 –/)).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('opens a day from its number and goes back to the month', async () => {
      const onViewChange = jest.fn();
      const onDateChange = jest.fn();
      const { user } = setup(
        <Calendar
          defaultDate={NOW}
          events={events}
          onViewChange={onViewChange}
          onDateChange={onDateChange}
        />,
      );
      await user.click(
        within(day(/Monday, 12 October/)).getByRole('button', {
          name: 'Monday, 12 October 2026',
        }),
      );
      expect(onDateChange).toHaveBeenCalledWith(new Date(2026, 9, 12));
      expect(onViewChange).toHaveBeenCalledWith('day');
      expect(screen.getByText('Standup')).toBeInTheDocument();
      expect(screen.queryByText('Tuesday')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Back to month' }));
      expect(onViewChange).toHaveBeenLastCalledWith('month');
      expect(screen.getByText('Tuesday')).toBeInTheDocument();
    });

    it('does not switch views with a single view or a pinned view', () => {
      const { rerender } = setup(
        <Calendar defaultDate={NOW} views={['month']} />,
      );
      expect(
        within(day(/Monday, 12 October/)).queryByRole('button', {
          name: 'Monday, 12 October 2026',
        }),
      ).not.toBeInTheDocument();

      rerender(<Calendar view="day" defaultDate={NOW} />);
      expect(
        screen.queryByRole('button', { name: 'Back to month' }),
      ).not.toBeInTheDocument();
    });

    it('moves between months and views from the toolbar', async () => {
      const { user } = setup(<Calendar toolbar defaultDate={NOW} />);
      expect(
        screen.getByRole('heading', { name: 'October 2026' }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Next month' }));
      expect(
        screen.getByRole('heading', { name: 'November 2026' }),
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Today' }));
      expect(
        screen.getByRole('heading', { name: 'October 2026' }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Day' }));
      expect(
        screen.getByRole('heading', { name: 'Thursday, 15 October 2026' }),
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Previous day' }));
      expect(
        screen.getByRole('heading', { name: 'Wednesday, 14 October 2026' }),
      ).toBeInTheDocument();
    });

    it('reports the visible range on mount and when it changes', async () => {
      const onRangeChange = jest.fn();
      const { user } = setup(
        <Calendar toolbar defaultDate={NOW} onRangeChange={onRangeChange} />,
      );
      // October 2026 starts on a Thursday and ends on a Saturday.
      expect(onRangeChange).toHaveBeenCalledTimes(1);
      expect(onRangeChange).toHaveBeenLastCalledWith({
        view: 'month',
        start: new Date(2026, 8, 28),
        end: new Date(2026, 10, 1, 23, 59, 59, 999),
      });

      await user.click(screen.getByRole('button', { name: 'Day' }));
      expect(onRangeChange).toHaveBeenLastCalledWith({
        view: 'day',
        start: new Date(2026, 9, 15),
        end: new Date(2026, 9, 15, 23, 59, 59, 999),
      });
      expect(onRangeChange).toHaveBeenCalledTimes(2);
    });

    it('marks the calendar busy while loading', () => {
      setup(<Calendar date={NOW} loading />);
      expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('entries', () => {
    it('opens renderEventDetails next to the clicked entry', async () => {
      const onEventClick = jest.fn();
      const { user } = setup(
        <Calendar
          date={NOW}
          events={events}
          onEventClick={onEventClick}
          renderEventDetails={(event, { close }) => (
            <CalendarEventDetails
              title={event.title}
              subtitle="Monday 12"
              fields={[{ label: 'Room', value: 'Blue' }]}
              onClose={close}
            />
          )}
        />,
      );
      const standup = screen.getByRole('button', { name: /Standup/ });
      await user.click(standup);

      const dialog = await screen.findByRole('dialog', { name: 'Standup' });
      expect(onEventClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'standup' }),
        { anchor: standup },
      );
      expect(within(dialog).getByText('Blue')).toBeInTheDocument();

      await user.click(within(dialog).getByRole('button', { name: 'Close' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(standup);
      await screen.findByRole('dialog');
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('borders the details card in a popover but not in a modal', async () => {
      const details = () => <CalendarEventDetails title="Standup" />;
      const card = async () =>
        (await screen.findByRole('dialog')).firstElementChild!;
      const { user, rerender } = setup(
        <Calendar date={NOW} events={events} renderEventDetails={details} />,
      );
      await user.click(screen.getByRole('button', { name: /Standup/ }));
      expect(getComputedStyle(await card()).borderTopWidth).toBe('1px');
      await user.keyboard('{Escape}');

      rerender(
        <Calendar
          date={NOW}
          events={events}
          renderEventDetails={details}
          eventDetailsDisplay="modal"
        />,
      );
      await user.click(screen.getByRole('button', { name: /Standup/ }));
      expect(getComputedStyle(await card()).borderTopWidth).toBe('');
    });

    it('closes the details when their event is removed', async () => {
      const details = () => <span>details</span>;
      const { user, rerender } = setup(
        <Calendar date={NOW} events={events} renderEventDetails={details} />,
      );
      await user.click(screen.getByRole('button', { name: /Review/ }));
      expect(await screen.findByText('details')).toBeInTheDocument();

      rerender(
        <Calendar
          date={NOW}
          events={events.filter((event) => event.id !== 'review')}
          renderEventDetails={details}
        />,
      );
      expect(screen.queryByText('details')).not.toBeInTheDocument();
    });

    it('renders actions outside the click target', async () => {
      const onEventClick = jest.fn();
      const onRemove = jest.fn();
      const { user } = setup(
        <Calendar
          date={NOW}
          events={events}
          onEventClick={onEventClick}
          renderEventActions={(event) =>
            event.id === 'review' ? (
              <button type="button" onClick={() => onRemove(event.id)}>
                Remove
              </button>
            ) : null
          }
        />,
      );
      const remove = screen.getByRole('button', { name: 'Remove' });
      // Not nested inside the entry's own button.
      expect(remove.parentElement?.closest('button')).toBeNull();
      await user.click(remove);
      expect(onRemove).toHaveBeenCalledWith('review');
      expect(onEventClick).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', { name: /Review/ }));
      expect(onEventClick).toHaveBeenCalledTimes(1);
    });

    it('applies getEventProps and hands renderEvent the default', async () => {
      const onEventClick = jest.fn();
      const { user } = setup(
        <Calendar
          date={NOW}
          events={events}
          onEventClick={onEventClick}
          getEventProps={(event) =>
            event.id === 'review' ? { className: 'urgent' } : undefined
          }
          renderEvent={(event, { defaultContent, onClick }) =>
            event.id === 'standup' ? (
              <div data-testid="wrapped">{defaultContent}</div>
            ) : event.id === 'log' ? (
              <button type="button" onClick={onClick}>
                custom log
              </button>
            ) : undefined
          }
        />,
      );
      expect(screen.getByTitle('Review')).toHaveClass('urgent');
      expect(
        within(screen.getByTestId('wrapped')).getByText('Standup'),
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'custom log' }));
      expect(onEventClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'log' }),
        expect.objectContaining({ anchor: expect.any(HTMLElement) }),
      );
    });

    it('has no axe violations with the details open', async () => {
      const { user, container } = setup(
        <Calendar
          date={NOW}
          events={events}
          renderEventDetails={(event, { close }) => (
            <CalendarEventDetails
              title={event.title}
              fields={[{ label: 'Room', value: 'Blue' }]}
              onEdit={() => {}}
              onDelete={() => {}}
              onClose={close}
            />
          )}
        />,
      );
      await user.click(screen.getByRole('button', { name: /Standup/ }));
      const dialog = await screen.findByRole('dialog');
      jest.useRealTimers();
      // The dialog is portalled out of the container, so check both.
      // floating-ui's focus guards are unnamed `role="button"`s that it
      // inserts around the dialog; they're its own, not the calendar's.
      const options = { rules: { 'aria-command-name': { enabled: false } } };
      expect(await checkA11y(container, options)).toHaveNoViolations();
      expect(await checkA11y(dialog, options)).toHaveNoViolations();
    });
  });
});
