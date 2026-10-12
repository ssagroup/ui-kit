import {
  NestedTableCellBase,
  NestedTableCellBaseProps,
} from './NestedTableCellBase';

/**
 * NestedTableCell - Cell for a `NestedTableRow`.
 *
 * Use instead of `TableCell` inside a nested table: it reads the group's
 * collapsed state and animates its own height, which a plain `TableCell` will
 * not do. Must be rendered inside `WithNestedTableRow`.
 *
 * ### Children are wrapped in a div
 * The cell renders its children inside a `Wrapper`, and the collapse transition
 * animates that inner element rather than the `td`. Two consequences: a `& div`
 * selector in your `css` will hit the wrapper, and content that must fill the
 * cell should stretch the wrapper rather than the cell itself.
 *
 * Borders and background are cleared so the group reads as one block; the row
 * supplies the shading.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <NestedTableRow>
 *   <NestedTableCell>Platform</NestedTableCell>
 *   <NestedTableCell>9</NestedTableCell>
 * </NestedTableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Header cells render as `th`
 * <NestedTableCell as="th">Headcount</NestedTableCell>
 * ```
 */
export const NestedTableCell = (
  props: Omit<NestedTableCellBaseProps, 'adornment' | 'trailing'>,
) => <NestedTableCellBase {...props} />;
