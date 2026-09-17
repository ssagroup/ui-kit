import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';
import { ColumnResizeMode } from './types';

export interface TableBaseProps extends CommonProps {
  /** Applies the truncation rules resizing depends on. */
  isResizable?: boolean;
  /**
   * Whether the columns have been measured yet. Fixed layout is what makes a
   * dragged width stick, but it can only be switched on once there are widths
   * to switch to.
   */
  hasColumnWidths?: boolean;
  /** How a resize distributes width. See TableProps.columnResizeMode. */
  columnResizeMode?: ColumnResizeMode;
}

/**
 * The styled element behind `Table`.
 *
 * Kept separate so `Table` can stay a component with state and a colgroup while
 * everything that composes it — `NestedTable`, consumer `styled(Table)` calls —
 * keeps getting a plain table element underneath.
 *
 * ### Nothing per-pixel belongs in here
 *
 * Every distinct value interpolated into this template mints another emotion
 * class and injects another stylesheet rule, permanently. A width that changes
 * with the pointer would add one rule per frame of every drag — a few hundred
 * within seconds — and each insertion invalidates the document's style cache,
 * so resizing gets progressively slower until the page is reloaded. The table's
 * width in `expand` mode is therefore an inline style, set by `Table`, and the
 * props here only ever take a handful of values.
 */
const TableBase = styled.table<TableBaseProps>`
  display: table;

  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;

  background: none;

  ${({ isResizable, hasColumnWidths }) =>
    isResizable &&
    hasColumnWidths &&
    css`
      /* Auto layout treats column widths as suggestions and renegotiates them
         from content, so a dragged width would not survive the next render. */
      table-layout: fixed;
    `}

  ${({ isResizable }) =>
    isResizable &&
    css`
      /* Cells are nowrap by default, so a column narrowed past its content
         would spill into the next column instead of truncating. */
      & th,
      & td {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* The handle is positioned against its own header cell. */
      & th {
        position: relative;
      }
    `}

  ${({ isResizable, columnResizeMode }) =>
    isResizable &&
    columnResizeMode === 'fit' &&
    css`
      /* The last column has nothing to its right to trade width with, so its
         handle would be inert. Hidden in CSS rather than not rendered, because
         which cell is last is only known once the row is in the DOM — a
         post-mount check would show the handle for a frame and then drop it. */
      & thead th:last-child > [role='separator'] {
        display: none;
      }

      /* Same reasoning one column over: a pinned column may not be resized, so
         the handle to its left has nothing it is allowed to trade with. */
      & thead th:has(+ th[data-column-pinned='true']) > [role='separator'] {
        display: none;
      }
    `}
`;

export default TableBase;
