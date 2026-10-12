import { MouseEvent } from 'react';
import { useTheme } from '@emotion/react';

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
  const isTask = event.kind === 'task';
  const actions = renderEventActions?.(event, { view, inPopover });
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
        {!item.allDay && (
          <span css={S.slotTime}>{formatTime(item.start, timeFormat)}</span>
        )}
        <span css={S.slotTitle}>{event.title}</span>
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
      {onClick ? (
        <button type="button" css={S.slotContentButton} onClick={onClick}>
          {content}
        </button>
      ) : (
        content
      )}
      {withActions && <span css={S.slotActions}>{actions}</span>}
      {isTask && <TaskCheckbox event={event} />}
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
    defaultContent,
    onClick,
  });
  return custom === undefined ? defaultContent : <>{custom}</>;
};
