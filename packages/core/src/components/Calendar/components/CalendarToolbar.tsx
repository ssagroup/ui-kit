import { ReactNode } from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';

import Button from '@components/Button';
import { ButtonGroup } from '@components/ButtonGroup';
import { IconButton } from '@components/IconButton';

import { CalendarView } from '../types';
import { hasContent, withLocale } from '../utils';
import * as S from '../styles';

const VIEW_LABELS: Record<CalendarView, string> = {
  month: 'Month',
  day: 'Day',
};

type CalendarToolbarProps = {
  view: CalendarView;
  date: DateTime;
  locale?: string;
  /** Moves to a date; `undefined` when the date can't move. */
  onNavigate?: (date: DateTime) => void;
  /** Views to toggle between; the toggle shows with two or more. */
  views: CalendarView[];
  onViewChange?: (view: CalendarView) => void;
  end?: ReactNode;
};

/**
 * The bar above the grid: previous / today / next, the date on show, the
 * consumer's content and the view toggle.
 */
export const CalendarToolbar = ({
  view,
  date,
  locale,
  onNavigate,
  views,
  onViewChange,
  end,
}: CalendarToolbarProps) => {
  const theme = useTheme();
  const unit = view === 'month' ? 'month' : 'day';
  const title = withLocale(date, locale).toFormat(
    view === 'month' ? 'LLLL yyyy' : 'cccc, d LLLL yyyy',
  );
  const iconColor = theme.colors.greyDarker;

  return (
    <div css={S.toolbar(theme)}>
      {onNavigate && (
        <div css={S.toolbarNav}>
          <IconButton
            icon="carrot-left"
            transparent
            aria-label={`Previous ${unit}`}
            styles={{ iconColor }}
            onClick={() => onNavigate(date.minus({ [unit]: 1 }))}
          />
          <Button
            variant="secondary"
            size="small"
            text="Today"
            onClick={() => onNavigate(DateTime.now().startOf('day'))}
          />
          <IconButton
            icon="carrot-right"
            transparent
            aria-label={`Next ${unit}`}
            styles={{ iconColor }}
            onClick={() => onNavigate(date.plus({ [unit]: 1 }))}
          />
        </div>
      )}
      <h2 css={S.toolbarTitle} aria-live="polite">
        {title}
      </h2>
      {hasContent(end) && <div css={S.toolbarEnd}>{end}</div>}
      {onViewChange && views.length > 1 && (
        // ButtonGroup renders its buttons without a wrapper; without one the
        // toolbar's gap would split them apart.
        <div css={S.toolbarViews}>
          <ButtonGroup
            items={views.map((id) => ({ id, text: VIEW_LABELS[id] }))}
            value={view}
            onClick={(item) => onViewChange(item.id as CalendarView)}
          />
        </div>
      )}
    </div>
  );
};
