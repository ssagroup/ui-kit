import { Filter } from '../useFiltersMultiSelect';

export interface FiltersMultiSelectOptionProps {
  /** The filter this row adds. `group: true` makes it a select-only row. */
  filter: Filter;
  /** Row content. */
  children: React.ReactNode;
  /**
   * @deprecated Ignored — the row's state comes from the store's selected
   * filters. Removed in the next major release.
   */
  selected?: boolean;
}

/**
 * FiltersMultiSelectOption - One filter row of a `FiltersMultiSelect`.
 *
 * Declarative: `FiltersMultiSelectOptions` reads its props and renders the
 * row, so it renders nothing on its own. Regular filters get + (include) and
 * − (exclude) controls; `group` filters get a single check-circle.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * <FiltersMultiSelectOptions>
 *   <FiltersMultiSelectOption filter={{ id: '1', label: 'Active' }}>
 *     Active
 *   </FiltersMultiSelectOption>
 *   <FiltersMultiSelectOption filter={{ id: 'g', label: 'Saved', group: true }}>
 *     Saved
 *   </FiltersMultiSelectOption>
 * </FiltersMultiSelectOptions>
 * ```
 *
 * @see {@link FiltersMultiSelectOptions} - The list that renders it
 */
export const FiltersMultiSelectOption = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: FiltersMultiSelectOptionProps,
) => null;
