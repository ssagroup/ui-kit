import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';
import { ColumnResizeMode, FrozenColumnIndices } from './types';
import {
  frozenOffsetVar,
  SHADOW_END_ATTR,
  SHADOW_START_ATTR,
} from './hooks/useColumnFreeze';

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
  /**
   * Positions of the frozen columns on each edge, resolved by `Table` from
   * the ids in TableProps.frozenColumns.
   */
  frozenIndices?: FrozenColumnIndices;
  /** Keeps the header row in view. See TableProps.stickyHeader. */
  stickyHeader?: boolean;
}

/* Direct rows only, so a table nested inside a cell is left alone. */
const ROW_CELLS = '& > * > tr >';
const HEAD_CELLS = '& > thead > tr >';

/* Same colour as TableHead's bottom rule, which a header cell's own shadow
   would otherwise replace. */
const HEAD_RULE = 'inset 0 -1px 0 rgb(234, 236, 240)';

/**
 * Sticky rules for the frozen columns. Only their positions reach the
 * stylesheet; the offsets are custom properties the table sets on itself.
 */
const frozenColumnStyles = (
  edge: 'start' | 'end',
  indices: number[],
  shadowColor: string,
) => {
  const side = edge === 'start' ? 'left' : 'right';
  const shadowAttr = edge === 'start' ? SHADOW_START_ATTR : SHADOW_END_ATTR;
  const edgeShadow = `${edge === 'start' ? 4 : -4}px 0 8px ${shadowColor}`;
  // Clipped to the cell's own top and bottom, so a column of cells reads as
  // one continuous edge instead of a stack of separately blurred ones.
  const edgeClip =
    edge === 'start' ? 'inset(0 -16px 0 0)' : 'inset(0 0 0 -16px)';
  return indices
    .map((index) => {
      const nth = `:nth-child(${index + 1})`;
      return `
        ${ROW_CELLS} ${nth} {
          position: sticky;
          ${side}: var(${frozenOffsetVar(index)}, 0px);
          z-index: 1;
        }
        ${HEAD_CELLS} ${nth} {
          z-index: 3;
        }
        /* The divider, only while content is scrolled under this column. */
        &[${shadowAttr}='${index}'] > * > tr > ${nth} {
          box-shadow: ${edgeShadow};
          clip-path: ${edgeClip};
        }
        &[${shadowAttr}='${index}'] > thead > tr > ${nth} {
          box-shadow: ${HEAD_RULE}, ${edgeShadow};
        }
      `;
    })
    .join('');
};

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

  ${({ stickyHeader, frozenIndices }) =>
    (stickyHeader ||
      !!frozenIndices?.start.length ||
      !!frozenIndices?.end.length) &&
    css`
      /* Collapsed borders do not travel with sticky cells, and cells in the
         collapsing model paint no box-shadow at all, so the frozen edge would
         have no divider. With spacing 0 and borderless cells the separated
         model looks identical. */
      border-collapse: separate;

      /* Keeps the sticky cells' z-indexes inside the table. Without it they
         compete with the whole page, and a frozen cell paints over popovers,
         tooltips and dropdowns portalled to the body. */
      isolation: isolate;
    `}

  ${({ stickyHeader }) =>
    stickyHeader &&
    css`
      /* Under the frozen columns' header cells (3), over every body cell. */
      ${HEAD_CELLS} * {
        position: sticky;
        top: 0;
        z-index: 2;
      }
    `}

  ${({ frozenIndices, theme }) => {
    if (!frozenIndices?.start.length && !frozenIndices?.end.length) {
      return undefined;
    }
    const shadow = theme.colors.greyShadow24 ?? 'rgba(93, 102, 112, 0.24)';
    return css`
      ${frozenColumnStyles('start', frozenIndices.start, shadow)}
      ${frozenColumnStyles('end', frozenIndices.end, shadow)}
    `;
  }}
`;

export default TableBase;
