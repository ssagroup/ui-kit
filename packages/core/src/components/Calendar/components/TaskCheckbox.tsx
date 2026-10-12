import Checkbox from '@components/Checkbox';

import { useCalendarContext } from '../CalendarContext';
import { CalendarEvent } from '../types';
import * as S from '../styles';

/**
 * Completion checkbox of a `task` entry. Read-only (disabled) when the
 * calendar has no `onTaskToggle`.
 */
export const TaskCheckbox = ({ event }: { event: CalendarEvent }) => {
  const { onTaskToggle } = useCalendarContext();
  const name = typeof event.title === 'string' ? event.title : 'task';

  return (
    <span css={S.slotCheckbox}>
      <Checkbox
        checked={Boolean(event.completed)}
        disabled={!onTaskToggle}
        onChange={(completed) => onTaskToggle?.(event, completed)}
        text={<span css={S.visuallyHidden}>{`Mark ${name} as done`}</span>}
      />
    </span>
  );
};
