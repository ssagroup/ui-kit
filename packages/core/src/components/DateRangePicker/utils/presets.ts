import { DateTime } from 'luxon';
import { DateRangePreset, DateRangePresetValue } from '../types';

/**
 * Presets are resolved at click (and render) time rather than at module load,
 * so a relative range such as **Today** stays correct in an app that is left
 * open across midnight.
 */
export const resolvePresetRange = (
  preset: DateRangePreset,
): DateRangePresetValue =>
  typeof preset.dateRange === 'function'
    ? preset.dateRange()
    : preset.dateRange;

/**
 * Both ends are normalized to midnight — the same normalization calendar
 * selection applies — so a preset range compares equal to the range the user
 * would get by clicking the same two days.
 */
const range = (from: DateTime, to: DateTime): DateRangePresetValue => [
  from.startOf('day').toJSDate(),
  to.startOf('day').toJSDate(),
];

/** **Today** — a single-day range on the current date. */
export const todayPreset: DateRangePreset = {
  label: 'Today',
  dateRange: () => {
    const now = DateTime.now();
    return range(now, now);
  },
};

/** **Yesterday** — a single-day range on the previous date. */
export const yesterdayPreset: DateRangePreset = {
  label: 'Yesterday',
  dateRange: () => {
    const yesterday = DateTime.now().minus({ days: 1 });
    return range(yesterday, yesterday);
  },
};

/**
 * **Current week** — the whole week containing today, first to last day.
 * Week boundaries follow Luxon's locale rules (Monday-first by default).
 */
export const currentWeekPreset: DateRangePreset = {
  label: 'Current week',
  dateRange: () => {
    const now = DateTime.now();
    return range(now.startOf('week'), now.endOf('week'));
  },
};

/** **Last week** — the full week before the current one. */
export const lastWeekPreset: DateRangePreset = {
  label: 'Last week',
  dateRange: () => {
    const lastWeek = DateTime.now().minus({ weeks: 1 });
    return range(lastWeek.startOf('week'), lastWeek.endOf('week'));
  },
};

/** **Current month** — the first to the last day of the current month. */
export const currentMonthPreset: DateRangePreset = {
  label: 'Current month',
  dateRange: () => {
    const now = DateTime.now();
    return range(now.startOf('month'), now.endOf('month'));
  },
};

/** **Last month** — the full month before the current one. */
export const lastMonthPreset: DateRangePreset = {
  label: 'Last month',
  dateRange: () => {
    const lastMonth = DateTime.now().minus({ months: 1 });
    return range(lastMonth.startOf('month'), lastMonth.endOf('month'));
  },
};

/**
 * Ready-made preset list for the common “today / yesterday / week / month”
 * shortcuts. Pass it straight to **`presets`**, or compose your own array from
 * the individual presets (and your own entries) to change the set or order.
 *
 * @example
 * ```tsx
 * import { DateRangePicker, DEFAULT_DATE_RANGE_PRESETS } from '@ssa-ui-kit/core';
 *
 * <DateRangePicker name="report" presets={DEFAULT_DATE_RANGE_PRESETS} />
 * ```
 */
export const DEFAULT_DATE_RANGE_PRESETS: DateRangePreset[] = [
  todayPreset,
  yesterdayPreset,
  currentWeekPreset,
  lastWeekPreset,
  currentMonthPreset,
  lastMonthPreset,
];
