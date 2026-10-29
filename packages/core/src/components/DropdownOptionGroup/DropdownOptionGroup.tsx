import { ReactNode } from 'react';

/** Props of {@link DropdownOptionGroup}. */
export interface DropdownOptionGroupProps {
  /** Group title. Not selectable and skipped by keyboard navigation. */
  label: ReactNode;
  /**
   * Unique per dropdown. Defaults to one derived from the element key
   * (or position).
   */
  id?: string;
  /** The group's `DropdownOption`s. */
  children?: ReactNode;
}

/**
 * DropdownOptionGroup - A titled section of options inside `Dropdown` or
 * `MultipleDropdown`.
 *
 * Wrap `DropdownOption` children in it to show them under a title; groups are
 * separated by a divider. Options outside any group can sit next to groups.
 * Like `DropdownOption`, it is read by the parent dropdown rather than rendered
 * as written, so it only works as a direct child of the dropdown.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * <Dropdown selectedItem={selected} onChange={setSelected}>
 *   <DropdownOptionGroup label="Fruits">
 *     <DropdownOption value="apple">Apple</DropdownOption>
 *     <DropdownOption value="banana">Banana</DropdownOption>
 *   </DropdownOptionGroup>
 *   <DropdownOptionGroup label="Vegetables">
 *     <DropdownOption value="carrot">Carrot</DropdownOption>
 *   </DropdownOptionGroup>
 * </Dropdown>
 * ```
 */
const DropdownOptionGroup = ({ children }: DropdownOptionGroupProps) => (
  <>{children}</>
);

export default DropdownOptionGroup;
