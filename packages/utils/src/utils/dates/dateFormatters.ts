const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const periodValues: Record<string, number> = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  min: 60,
};

/**
 * Formats a timestamp as a zero-padded 12-hour clock time, e.g. `"09:05 AM"`.
 *
 * Locale is hard-coded to `en-US`, so output does not follow the user's locale.
 * The **time zone is not** — it uses the runtime's, so a server and a browser
 * can render the same timestamp differently.
 *
 * @param timestampMs - Milliseconds since the epoch, as `Date.now()` returns.
 *
 * @example
 * dateFormatters.formatTime(1735732800000); // '09:20 AM'
 */
export const formatTime = (timestampMs: number) =>
  new Date(timestampMs).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

/**
 * Returns the three-letter English weekday for a timestamp, e.g. `"Mon"`.
 *
 * Uses the runtime's time zone, so a timestamp near midnight can resolve to a
 * different day than the user expects.
 *
 * @param timestampMs - Milliseconds since the epoch.
 *
 * @example
 * dateFormatters.formatDayOfWeek(Date.now()); // 'Thu'
 */
export const formatDayOfWeek = (timestampMs: number) =>
  dayOfWeekNames[new Date(timestampMs).getDay()];

/**
 * Formats a timestamp as day and abbreviated month, e.g. `"05 Jan"` — no year.
 *
 * Locale is hard-coded to `en-US`. Since the year is omitted, do not use it
 * where dates span more than one year without adding the year yourself.
 *
 * @param timestampMs - Milliseconds since the epoch.
 *
 * @example
 * dateFormatters.formatDate(1735732800000); // '01 Jan'
 */
export const formatDate = (timestampMs: number) =>
  new Date(timestampMs).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

/**
 * Maps a weekday index to its three-letter English name.
 *
 * Takes a **day index** (0 = Sunday … 6 = Saturday), not a timestamp — for a
 * timestamp use `formatDayOfWeek`. Anything outside 0–6 returns `undefined`,
 * so the return type is `string | undefined`.
 *
 * @example
 * dateFormatters.printDayOfTheWeek(0); // 'Sun'
 * dateFormatters.printDayOfTheWeek(9); // undefined
 */
export const printDayOfTheWeek = (day: number) => {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
};

/**
 * Renders how long ago a date was, e.g. `"3 days ago"`, `"1 hour ago"`.
 *
 * Falls back to `"Just Now"` for anything under a minute. Granularity stops at
 * years, and months are approximated as 30 days, so long gaps drift from the
 * calendar.
 *
 * Throws `Error('Invalid date')` when the value cannot be parsed — including
 * date strings the runtime does not recognise, so prefer passing a timestamp.
 * The result is computed against `Date.now()` at call time and does not update
 * on its own; re-render on a timer if it needs to stay current.
 *
 * @param timeValue - Timestamp in ms, or any string `new Date()` accepts.
 *
 * @example
 * dateFormatters.getTimeAgo(Date.now() - 3 * 86400 * 1000); // '3 days ago'
 * dateFormatters.getTimeAgo(Date.now() - 5000); // 'Just Now'
 */
export const getTimeAgo = (timeValue: string | number) => {
  const date = new Date(timeValue).getTime();
  if (Number.isNaN(date)) {
    throw new Error('Invalid date');
  }
  const diff = Math.floor((Date.now() - date) / 1000);
  let interval;
  for (const key in periodValues) {
    interval = Math.floor(diff / periodValues[key]);
    if (interval >= 1) {
      const pluralValue = interval > 1 ? 's' : '';
      return `${interval} ${key}${pluralValue} ago`;
    }
  }

  return 'Just Now';
};
