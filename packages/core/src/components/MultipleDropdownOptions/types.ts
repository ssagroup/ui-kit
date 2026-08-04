export type DropdownOptionType = Record<string, string | number>;

export interface DropdownItemsListProps {
  /**
   * ARIA label reference
   * Associates the listbox with its label
   */
  'aria-labelledby'?: string;
  /**
   * ARIA label reference
   * Associates the listbox with its label
   *
   * @deprecated Use `aria-labelledby` instead — `ariaLabelledby` is removed in
   * the next major release.
   */
  ariaLabelledby?: string;
  id?: string;
  children?: React.ReactNode;
}
