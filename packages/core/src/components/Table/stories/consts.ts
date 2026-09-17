import { SortInfo } from './types';

export const DEFAULT_SORT: SortInfo = {
  column: 'value',
  order: 'desc',
};

/**
 * The props the docs page lists for `Table`.
 *
 * `TableProps` extends `TableHTMLAttributes`, so react-docgen-typescript pulls
 * in every DOM attribute a table element accepts — close to 300 rows of
 * `accessKey`, `aria-*` and `onKeyUpCapture` burying the handful of props that
 * are actually the kit's. Both the Controls block in `Table.mdx` and the
 * addon panel filter against this list.
 */
export const DOCUMENTED_TABLE_PROPS = [
  'resizableColumns',
  'columnResizeMode',
  'columnWidths',
  'defaultColumnWidths',
  'onColumnWidthsChange',
  'minColumnWidth',
  'maxColumnWidth',
];
