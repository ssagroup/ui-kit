import { CSSProperties, ReactNode } from 'react';
import { useTheme } from '@emotion/react';

import { IconButton } from '@components/IconButton';

import { hasContent } from './utils';
import * as S from './styles';

/**
 * A label/value pair of {@link CalendarEventDetails}.
 */
export type CalendarEventDetailsField = {
  label: ReactNode;
  value: ReactNode;
  /**
   * Spans both columns — for prose such as a description.
   * @default false
   */
  fullWidth?: boolean;
};

/**
 * Props of {@link CalendarEventDetails}.
 */
export type CalendarEventDetailsProps = {
  /** Heading, e.g. `'Time Log Detail'` or the event's title. */
  title: ReactNode;
  /** Text next to the heading, e.g. `'Friday 2'`. */
  subtitle?: ReactNode;
  /** Label/value pairs, laid out in two columns (one on narrow screens). */
  fields?: CalendarEventDetailsField[];
  /** Anything under the fields. */
  children?: ReactNode;
  /** Shows an edit button in the header. */
  onEdit?: () => void;
  /** Shows a delete button in the header. */
  onDelete?: () => void;
  /** Shows a close button in the header. */
  onClose?: () => void;
  /** More buttons in the header, before edit and delete. */
  actions?: ReactNode;
  /** @default 'Edit' */
  editLabel?: string;
  /** @default 'Delete' */
  deleteLabel?: string;
  /** @default 'Close' */
  closeLabel?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * CalendarEventDetails - The card a calendar entry opens: a heading with
 * edit, delete and close buttons, and the entry's details as label/value
 * pairs.
 *
 * Made for `Calendar`'s `renderEventDetails`, which positions and opens it;
 * it holds no data of its own, so it works for any kind of entry.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <Calendar
 *   events={logs}
 *   renderEventDetails={(event, { close }) => (
 *     <CalendarEventDetails
 *       title="Time Log Detail"
 *       subtitle="Friday 2"
 *       fields={[
 *         { label: 'Date', value: '02.10.2026' },
 *         { label: 'Project', value: event.data.project },
 *         { label: 'Notes', value: event.data.notes, fullWidth: true },
 *       ]}
 *       onEdit={() => openEditModal(event)}
 *       onDelete={() => { remove(event.id); close(); }}
 *       onClose={close}
 *     />
 *   )}
 * />
 * ```
 *
 * @accessibility
 * - The heading is an `h2`; inside the calendar the card is a labelled `dialog`
 * - Edit, delete and close are icon buttons named by `editLabel`, `deleteLabel` and `closeLabel`
 * - Fields are a description list (`dl`)
 */
export const CalendarEventDetails = ({
  title,
  subtitle,
  fields,
  children,
  onEdit,
  onDelete,
  onClose,
  actions,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  closeLabel = 'Close',
  className,
  style,
}: CalendarEventDetailsProps) => {
  const theme = useTheme();
  const iconColor = theme.colors.greyDarker;

  return (
    <div className={className} style={style} css={S.details(theme)}>
      <div css={S.detailsHeader}>
        <h2 css={S.detailsTitle}>
          {title}
          {hasContent(subtitle) && (
            <span css={S.detailsSubtitle(theme)}>{subtitle}</span>
          )}
        </h2>
        <div css={S.detailsActions}>
          {actions}
          {onEdit && (
            <IconButton
              icon="edit"
              transparent
              aria-label={editLabel}
              styles={{ iconColor }}
              onClick={onEdit}
            />
          )}
          {onDelete && (
            <IconButton
              icon="bin"
              transparent
              aria-label={deleteLabel}
              styles={{ iconColor }}
              onClick={onDelete}
            />
          )}
          {onClose && (
            <IconButton
              icon="cross"
              transparent
              aria-label={closeLabel}
              styles={{ iconColor }}
              onClick={onClose}
            />
          )}
        </div>
      </div>
      {fields && fields.length > 0 && (
        <dl css={S.detailsFields(theme)}>
          {fields.map((field, index) => (
            <div
              key={index}
              css={[S.detailsField(theme), field.fullWidth && S.fullRow]}>
              <dt css={S.detailsLabel}>{field.label}</dt>
              <dd css={S.detailsValue}>{field.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </div>
  );
};
