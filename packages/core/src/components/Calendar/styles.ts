import { css, keyframes, Theme } from '@emotion/react';

import {
  DAY_EVENT_MIN_HEIGHT,
  DAY_SCROLL_HEIGHT,
  HOUR_GUTTER_WIDTH,
  HOUR_HEIGHT,
  MONTH_CELL_MIN_HEIGHT,
  TIMELINE_LEAD,
  TOTAL_COLUMN_WIDTH,
} from './consts';

const divider = (theme: Theme) => `1px solid ${theme.colors.greyFocused}`;

const ellipsis = css({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const buttonReset = css({
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'none',
  font: 'inherit',
  color: 'inherit',
  textAlign: 'inherit',
  cursor: 'pointer',
});

/** Text styles of the design, by Figma style name. */
const text = {
  bodyMedium: { fontSize: 14, fontWeight: 500, lineHeight: '18px' },
  bodyMediumSemiBold: { fontSize: 14, fontWeight: 600, lineHeight: '18px' },
  bodySmall: { fontSize: 12, fontWeight: 500, lineHeight: '16px' },
  bodySmallSemiBold: { fontSize: 12, fontWeight: 600, lineHeight: '16px' },
} as const;

export const root = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    overflow: 'hidden',
    borderRadius: 20,
    background: theme.colors.white,
    boxShadow: `0 10px 40px 0 ${theme.colors.greyShadow}`,
    color: theme.colors.greyDarker,
  });

/**
 * Everything under the toolbar. Takes the root's height when it has one, and
 * holds the loading bar.
 */
export const body = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minHeight: 0,
});

const loadingSlide = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(250%)' },
});

export const loadingBar = (theme: Theme) =>
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    height: 3,
    overflow: 'hidden',
    background: theme.palette.secondary.light,
    pointerEvents: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '40%',
      background: theme.palette.primary.main,
      animation: `${loadingSlide} 1.2s ease-in-out infinite`,
    },
    '@media (prefers-reduced-motion: reduce)': {
      '&::after': { animationDuration: '3s' },
    },
  });

/** Entries already shown are dimmed while new ones load. */
export const bodyLoading = css({
  '& > :not([data-calendar-loading])': { opacity: 0.6 },
});

// ─── Toolbar ────────────────────────────────────────────────────────────────

export const toolbar = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    flexShrink: 0,
    padding: '10px 16px',
    borderBottom: divider(theme),
  });

export const toolbarNav = css({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const toolbarTitle = css(ellipsis, {
  flex: 1,
  margin: 0,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '28px',
});

export const toolbarViews = css({ display: 'flex' });

export const toolbarEnd = css({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

// ─── Month view ─────────────────────────────────────────────────────────────

/**
 * The header and the week rows scroll together, so the header can't drift
 * from the columns by a scrollbar's width; it stays in view with `sticky`.
 */
export const monthScroll = css({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
});

/**
 * Header and body share these tracks, and the same 2px column gap, so their
 * columns line up without measuring.
 */
export const monthColumns = (weekdays: 5 | 7, withTotal: boolean) =>
  css({
    display: 'grid',
    gridTemplateColumns: `repeat(${weekdays}, minmax(0, 1fr))${
      withTotal ? ` ${TOTAL_COLUMN_WIDTH[weekdays]}px` : ''
    }`,
    columnGap: 2,
  });

export const monthHeader = (theme: Theme) =>
  css({
    position: 'sticky',
    top: 0,
    zIndex: 2,
    background: theme.colors.white,
    borderBottom: divider(theme),
  });

export const monthHeaderCell = css(text.bodyMediumSemiBold, ellipsis, {
  display: 'flex',
  alignItems: 'center',
  height: 44,
  padding: '12px 16px',
});

/** The 2px gaps between cells show this grey as the grid lines. */
export const monthBody = (theme: Theme) =>
  css({
    rowGap: 2,
    background: theme.palette.secondary.light,
  });

export const monthCell = (theme: Theme) =>
  css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    minWidth: 0,
    minHeight: MONTH_CELL_MIN_HEIGHT,
    // Entries run to the cell's right edge, as in the design.
    padding: '6px 0 6px 6px',
    background: theme.colors.white,
    // The add button shows on hover. Keyed off a data attribute because a
    // parent can't target an emotion class name.
    '&:hover [data-calendar-add], &:focus-within [data-calendar-add]': {
      opacity: 1,
    },
  });

export const monthCellWeekend = (theme: Theme) =>
  css({
    background: theme.palette.secondary.light,
  });

/** Hover and keyboard focus outline the cell, when days can be added to. */
export const monthCellInteractive = (theme: Theme) =>
  css({
    '&:hover, &:focus-within': {
      borderRadius: 12,
      boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
    },
  });

export const monthCellHighlight = (outline: string | undefined, tint: string) =>
  css({
    padding: '5px 0 5px 5px',
    border: `1px solid ${outline}`,
    borderRadius: 12,
    background: `linear-gradient(${tint}, ${tint}), #fff`,
  });

export const monthCellHead = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 4,
  paddingRight: 5,
});

export const dateNumber = (theme: Theme) =>
  css(buttonReset, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '18px',
    color: theme.colors.greyDarker,
    cursor: 'default',
  });

export const dateNumberClickable = (theme: Theme) =>
  css({
    cursor: 'pointer',
    '&:hover': { background: theme.colors.greyLighter },
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  });

export const dateNumberOutside = (theme: Theme) =>
  css({ color: theme.colors.grey });

export const dateNumberToday = (theme: Theme) =>
  css({
    background: theme.palette.primary.main,
    color: theme.colors.white,
    '&:hover': { background: theme.palette.primary.dark },
  });

/**
 * Hidden with `opacity` rather than `display` so it stays reachable by
 * keyboard. The hiding only applies to pointers that can hover; on touch
 * screens the button is always shown.
 */
export const addButton = (theme: Theme) =>
  css(buttonReset, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 8,
    background: theme.palette.secondary.light,
    transition: 'opacity 120ms ease',
    '&:hover': { background: theme.palette.secondary.main },
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  });

export const addButtonOnHover = css({
  '@media (hover: hover)': {
    opacity: 0,
  },
});

export const monthEvents = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
});

export const moreButton = (theme: Theme) =>
  css(buttonReset, text.bodySmall, {
    alignSelf: 'flex-end',
    marginRight: 6,
    color: theme.colors.greyDarker60,
    '&:hover': { color: theme.palette.primary.main },
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  });

export const totalCell = (weekdays: 5 | 7) => (theme: Theme) =>
  css(ellipsis, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 13px',
    background: theme.colors.white,
    fontWeight: 600,
    ...(weekdays === 5
      ? { fontSize: 24, lineHeight: '32px' }
      : { fontSize: 16, lineHeight: '24px' }),
  });

export const footer = (theme: Theme) =>
  css(text.bodyMedium, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    minHeight: 44,
    padding: '12px 16px',
    borderTop: divider(theme),
    background: theme.colors.white,
  });

// ─── Entries ────────────────────────────────────────────────────────────────

/** A 34px entry row: colour stripe, title, optional time and trailing. */
export const slot = (theme: Theme, stripe: string | undefined) =>
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
    height: 34,
    paddingLeft: stripe ? 16 : 12,
    paddingRight: 12,
    borderRadius: 6,
    ...(stripe && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 6,
        borderRadius: '6px 0 0 6px',
        background: stripe,
      },
    }),
    'button&:hover, &:has(button:hover)': {
      background: theme.colors.greyLighter60,
    },
  });

export const slotButton = (theme: Theme) =>
  css(buttonReset, {
    width: '100%',
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
      outlineOffset: -1,
    },
  });

/** Lets the content button fill the row when the row also holds a checkbox. */
export const slotContentButton = css(buttonReset, {
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  flex: 1,
  minWidth: 0,
  '&::after': {
    // Stretches the click area over the whole row, under the checkbox.
    content: '""',
    position: 'absolute',
    inset: 0,
  },
});

export const slotContent = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 6,
  flex: 1,
  minWidth: 0,
});

export const slotMain = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  minWidth: 0,
});

export const slotTitle = css(text.bodyMedium, ellipsis);

export const slotTime = css(text.bodyMediumSemiBold, {
  flexShrink: 0,
  whiteSpace: 'nowrap',
});

export const slotTrailing = css(text.bodyMediumSemiBold, {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  whiteSpace: 'nowrap',
});

/** Above the row-wide click area of `slotContentButton`. */
export const slotActions = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexShrink: 0,
});

/** Above the row-wide click area of `slotContentButton`. */
export const slotCheckbox = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexShrink: 0,
  '& label': { margin: 0 },
});

export const highlightRow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  minWidth: 0,
  height: 34,
  padding: '8px 8px 8px 12px',
  borderRadius: 6,
});

/** In a month cell the row starts at the cell's edge, past its padding. */
export const highlightRowInCell = css({
  margin: '0 4px 0 -6px',
});

export const highlightButton = (theme: Theme) =>
  css(buttonReset, {
    '&:hover': { background: theme.colors.white60 },
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
      outlineOffset: -1,
    },
  });

export const highlightMain = css({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
});

export const highlightBadge = (gradient: string) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: gradient,
  });

// ─── "+N more" popover ──────────────────────────────────────────────────────

export const popover = (theme: Theme) =>
  css({
    alignItems: 'stretch',
    gap: 12,
    width: 187,
    maxHeight: 360,
    padding: '8px 0',
    border: `1px solid ${theme.colors.greySelectedMenuItem}`,
    borderRadius: 8,
    background: theme.colors.white,
    zIndex: 10,
  });

export const popoverHeader = (theme: Theme) =>
  css(text.bodyMedium, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: '0 12px',
    color: theme.colors.greyDarker60,
  });

export const popoverClose = (theme: Theme) =>
  css(buttonReset, {
    display: 'flex',
    borderRadius: 4,
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  });

export const popoverList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minHeight: 0,
  padding: '0 8px',
  overflowY: 'auto',
});

// ─── Day view ───────────────────────────────────────────────────────────────

export const dayHeader = (theme: Theme, compact: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
    padding: '6px 12px',
    borderBottom: divider(theme),
    ...(compact && { minHeight: 64 }),
  });

export const backButton = (theme: Theme) =>
  css(buttonReset, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 8,
    '&:hover': { background: theme.colors.greyLighter },
    '&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  });

export const dayHeaderDate = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
});

export const dayBadge = (theme: Theme, isToday: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '18px',
    ...(isToday
      ? { background: theme.palette.primary.main, color: theme.colors.white }
      : { background: theme.palette.secondary.light }),
  });

export const dayHeaderWeekdayShort = css(text.bodySmallSemiBold);

export const dayHeaderTitle = (size: 'weekday' | 'monthYear') =>
  css(ellipsis, {
    flex: 1,
    margin: 0,
    fontWeight: 700,
    ...(size === 'weekday'
      ? { fontSize: 20, lineHeight: '28px' }
      : { fontSize: 24, lineHeight: '32px' }),
  });

/**
 * Shows a default window of the timeline when the calendar has no height of
 * its own, and grows or shrinks to the calendar's height when it has one.
 */
export const dayScroll = css({
  position: 'relative',
  flex: '1 1 auto',
  height: DAY_SCROLL_HEIGHT,
  minHeight: 0,
  overflowY: 'auto',
});

/**
 * Every row of the day view is the hour-label column plus the day's column,
 * so the labels line up with their rows without measuring.
 */
export const dayRow = css({
  display: 'grid',
  gridTemplateColumns: `${HOUR_GUTTER_WIDTH}px minmax(0, 1fr)`,
});

export const hourGutter = (theme: Theme) =>
  css({
    position: 'relative',
    borderRight: divider(theme),
  });

/** Centred on the line that starts its hour. */
export const hourLabel = css(text.bodyMediumSemiBold, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  transform: 'translateY(-50%)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
});

/**
 * Untimed entries stay in view while the timeline scrolls under them, as an
 * all-day row does.
 */
export const dayLeadRow = (theme: Theme) =>
  css({
    position: 'sticky',
    top: 0,
    zIndex: 3,
    background: theme.colors.white,
  });

/**
 * The sticky untimed row would hide the top half of 00:00, so that one label
 * sits just under its line instead.
 */
export const hourLabelFirst = css({ transform: 'translateY(4px)' });

/** Above 00:00. Grows to fit untimed entries. */
export const dayLead = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 2,
    minWidth: 0,
    minHeight: TIMELINE_LEAD,
    padding: '2px 12px 2px 4px',
    borderBottom: divider(theme),
  });

export const hourCell = (theme: Theme) =>
  css({
    height: HOUR_HEIGHT,
    borderBottom: divider(theme),
  });

export const hourCellLast = css({ borderBottom: 'none' });

export const hourCellAddable = (theme: Theme) =>
  css(buttonReset, {
    display: 'block',
    width: '100%',
    '&:hover': { background: theme.colors.greyLighter40 },
  });

export const dayHighlight = (outline: string | undefined, tint: string) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
    minHeight: 29,
    padding: '0 8px 0 2px',
    border: `1px solid ${outline}`,
    borderRadius: 12,
    background: `linear-gradient(${tint}, ${tint}), #fff`,
  });

export const dayHighlightLabel = css(text.bodyMedium, ellipsis, { flex: 1 });

/** Where the timeline's hours start, below the lead area. */
export const timeline = css({
  position: 'relative',
});

/** Holds the timed events over the hour cells, right of the labels. */
export const dayEventsLayer = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: HOUR_GUTTER_WIDTH,
  right: 0,
  // Clicks between events reach the hour cells underneath.
  pointerEvents: 'none',
  '& > :not([data-now])': { pointerEvents: 'auto' },
});

/** Places a timed entry; its content fills it. */
export const dayEventBox = css({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
});

export type DayEventSize = 'large' | 'medium' | 'small';

export const dayEvent = (
  theme: Theme,
  stripe: string | undefined,
  size: DayEventSize,
) =>
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minHeight: DAY_EVENT_MIN_HEIGHT,
    padding: size === 'small' ? '0 16px' : '8px 16px',
    overflow: 'hidden',
    borderRadius: 12,
    background: theme.palette.secondary.light,
    textAlign: 'left',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 8,
      background: stripe,
    },
    ...(size === 'medium' && { paddingTop: 0, paddingBottom: 0 }),
    'button&:hover, &:has(button:hover)': {
      background: theme.palette.secondary.main,
    },
    'button&:focus-visible': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  });

export const dayEventContent = (size: DayEventSize) =>
  css({
    display: 'flex',
    flexDirection: size === 'small' ? 'row' : 'column',
    alignItems: size === 'small' ? 'center' : 'flex-start',
    gap: size === 'small' ? 6 : 0,
    flex: 1,
    minWidth: 0,
  });

export const dayEventTitle = (size: DayEventSize) =>
  css(
    size === 'large' ? text.bodyMediumSemiBold : text.bodySmallSemiBold,
    ellipsis,
    { maxWidth: '100%' },
  );

export const dayEventTime = (size: DayEventSize) =>
  css(size === 'large' ? text.bodyMedium : text.bodySmall, {
    whiteSpace: 'nowrap',
  });

export const dayTask = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flex: 1,
  minWidth: 0,
});

export const nowPointer = (theme: Theme) =>
  css({
    position: 'absolute',
    left: -4,
    right: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    height: 7,
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    '&::before': {
      content: '""',
      width: 7,
      height: 7,
      flexShrink: 0,
      borderRadius: 2,
      background: theme.palette.primary.main,
    },
    '&::after': {
      content: '""',
      flex: 1,
      height: 2,
      background: theme.palette.primary.main,
    },
  });

// ─── Event details ──────────────────────────────────────────────────────────

export const detailsLayer = css({
  zIndex: 1000,
  outline: 'none',
});

export const detailsOverlay = (theme: Theme) =>
  css({
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    background: theme.colors.grey20,
  });

export const details = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: 480,
    maxWidth: 'calc(100vw - 32px)',
    padding: 24,
    borderRadius: 20,
    background: theme.colors.white,
    boxShadow: `0 10px 40px 0 ${theme.colors.greyShadow}`,
    color: theme.colors.greyDarker,
  });

export const detailsHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
});

export const detailsTitle = css({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '0 12px',
  minWidth: 0,
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '24px',
});

export const detailsSubtitle = (theme: Theme) =>
  css({
    fontWeight: 500,
    color: theme.colors.greyDark,
  });

export const detailsActions = css({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
});

/** Two columns of label/value pairs, one on narrow screens. */
export const detailsFields = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '20px 24px',
    margin: 0,
    [theme.mediaQueries.upToMd]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: 16,
    },
  });

export const detailsField = (theme: Theme) =>
  css(text.bodyMedium, {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    minWidth: 0,
    color: theme.colors.greyDarker,
  });

export const fullRow = css({ gridColumn: '1 / -1' });

export const detailsLabel = css({ fontWeight: 700 });

export const detailsValue = css({
  margin: 0,
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-wrap',
});

export const visuallyHidden = css({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
