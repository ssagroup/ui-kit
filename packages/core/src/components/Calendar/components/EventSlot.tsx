import { MouseEvent } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { useCalendarContext } from '../CalendarContext';
import { getEventColor } from '../consts';
import { CalendarView } from '../types';
import { formatTime, hasContent, NormalizedEvent } from '../utils';
import * as S from '../styles';
import { TaskCheckbox } from './TaskCheckbox';
import { EVENT_ROOT_ATTRIBUTE, useEventClick } from './useEventClick';

type EventSlotProps = {
  item: NormalizedEvent;
  view: CalendarView;
  inPopover?: boolean;
  /** Called after the entry is activated, e.g. to close the popover. */
  onClicked?: () => void;
  /** Element to anchor the details to instead of the entry itself. */
  getAnchor?: () => HTMLElement | null;
};

type DefaultEventSlotProps = Pick<
  EventSlotProps,
  'item' | 'view' | 'inPopover'
> & {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const DefaultEventSlot = ({
  item,
  view,
  inPopover = false,
  onClick,
}: DefaultEventSlotProps) => {
  const theme = useTheme();
  const { renderEventActions, getEventProps, timeFormat } =
    useCalendarContext();
  const { event } = item;

  const stripe = getEventColor(theme, event.color ?? 'blue');
  const chevronColor = theme.colors.greyDarker60;
  const isTask = event.kind === 'task';
  const span = { dayOfSpan: item.dayOfSpan, spanDays: item.spanDays };
  const actions = renderEventActions?.(event, { view, inPopover, ...span });
  const withActions = hasContent(actions);
  const extra = getEventProps?.(event);
  const rootProps = {
    [EVENT_ROOT_ATTRIBUTE]: '',
    title: typeof event.title === 'string' ? event.title : undefined,
    className: extra?.className,
    style: extra?.style,
  };

  const content = (
    <span css={S.slotContent}>
      <span css={S.slotMain}>
        {item.dayOfSpan > 1 && (
          <Icon name="carrot-left" size={12} color={chevronColor} />
        )}
        {!item.allDay && item.dayOfSpan === 1 && (
          <span css={S.slotTime}>{formatTime(item.start, timeFormat)}</span>
        )}
        <span css={S.slotTitle}>{event.title}</span>
        {item.spanDays > 1 && (
          <span css={S.visuallyHidden}>
            {`, day ${item.dayOfSpan} of ${item.spanDays}`}
          </span>
        )}
        {item.dayOfSpan < item.spanDays && (
          <Icon name="carrot-right" size={12} color={chevronColor} />
        )}
      </span>
      {hasContent(event.trailing) && (
        <span css={S.slotTrailing}>{event.trailing}</span>
      )}
    </span>
  );

  // The whole row is one button only when nothing else in it is interactive.
  if (!isTask && !withActions && onClick) {
    return (
      <button
        type="button"
        {...rootProps}
        css={[S.slotButton(theme), S.slot(theme, stripe)]}
        onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <div {...rootProps} css={S.slot(theme, stripe)}>
      {isTask && <TaskCheckbox event={event} />}
      {onClick ? (
        <button type="button" css={S.slotContentButton} onClick={onClick}>
          {content}
        </button>
      ) : (
        content
      )}
      {withActions && <span css={S.slotActions}>{actions}</span>}
    </div>
  );
};

/**
 * A 34px entry row, as listed in month cells, the "+N more" popover and the
 * day view's untimed entries.
 */
export const EventSlot = ({
  item,
  view,
  inPopover = false,
  onClicked,
  getAnchor,
}: EventSlotProps) => {
  const { renderEvent } = useCalendarContext();
  const activate = useEventClick(item.event, getAnchor);
  const onClick = activate
    ? (clickEvent: MouseEvent<HTMLElement>) => {
        activate(clickEvent);
        onClicked?.();
      }
    : undefined;

  const defaultContent = (
    <DefaultEventSlot
      item={item}
      view={view}
      inPopover={inPopover}
      onClick={onClick}
    />
  );
  const custom = renderEvent?.(item.event, {
    view,
    inPopover,
    dayOfSpan: item.dayOfSpan,
    spanDays: item.spanDays,
    defaultContent,
    onClick,
  });
  return custom === undefined ? defaultContent : <>{custom}</>;
};
