import { Theme } from '@emotion/react';

import { CalendarColor, CalendarHighlightColor } from './types';

/** Height of a month-grid cell, and the minimum when it holds more. */
export const MONTH_CELL_MIN_HEIGHT = 178;
/** Width of the weekly total column: 7-day and 5-day grids. */
export const TOTAL_COLUMN_WIDTH = { 7: 91, 5: 160 } as const;
/** Height of one hour on the day view's timeline. */
export const HOUR_HEIGHT = 68;
/**
 * Space above the 00:00 line. It holds untimed entries, and leaves room for
 * the 00:00 label, which is centred on its line.
 */
export const TIMELINE_LEAD = HOUR_HEIGHT / 2;
/**
 * Height of the day view's scrolling timeline when the calendar has no
 * height of its own: the untimed row and twelve hours.
 */
export const DAY_SCROLL_HEIGHT = TIMELINE_LEAD + 12 * HOUR_HEIGHT;
/** Width of the hour labels column. */
export const HOUR_GUTTER_WIDTH = 64;
/** Vertical gap between stacked timed events, split above and below. */
export const DAY_EVENT_GAP = 5;
/** Shortest an event is drawn, however brief. */
export const DAY_EVENT_MIN_HEIGHT = 15;

/** Stripe colour per palette entry. */
export const getEventColor = (theme: Theme, color: CalendarColor) =>
  ({
    purple: theme.colors.purple,
    blue: theme.colors.blue,
    lightBlue: theme.colors.blueLight,
    turquoise: theme.colors.turquoise,
    cyan: theme.colors.cyanTeal,
    green: theme.colors.green,
    yellow: theme.colors.yellowLighter,
    // The theme's `yellow` is the design's orange (#ED995D).
    orange: theme.colors.yellow,
    red: theme.colors.pink,
  })[color];

/** Outline, 8% tint and badge gradient of a whole-day highlight. */
export const getHighlightColors = (
  theme: Theme,
  color: CalendarHighlightColor,
) =>
  ({
    purple: {
      outline: theme.colors.purpleVivid,
      tint: 'rgba(146, 96, 252, 0.08)',
      gradient: `linear-gradient(244deg, ${theme.colors.purpleLighter} 16.5%, ${theme.colors.purple} 83.5%)`,
    },
    turquoise: {
      outline: theme.colors.greenJade,
      tint: 'rgba(44, 187, 151, 0.08)',
      gradient: `linear-gradient(116deg, ${theme.colors.turquoise} 16.5%, ${theme.colors.turquoiseLighter} 83.5%)`,
    },
    red: {
      outline: theme.colors.redSalmon,
      tint: 'rgba(255, 115, 121, 0.08)',
      gradient: `linear-gradient(99deg, ${theme.colors.pink} 7%, ${theme.colors.pinkLighter} 93%)`,
    },
    yellow: {
      outline: theme.colors.orangePeach,
      tint: 'rgba(253, 198, 125, 0.08)',
      gradient: `linear-gradient(90deg, ${theme.colors.yellow} 0%, ${theme.colors.yellowLighter} 100%)`,
    },
  })[color];
