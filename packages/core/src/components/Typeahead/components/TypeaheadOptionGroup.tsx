import { ReactNode } from 'react';

/** Props of {@link TypeaheadOptionGroup}. */
export interface TypeaheadOptionGroupProps {
  /** Group title. Not selectable and skipped by keyboard navigation. */
  label: ReactNode;
  /**
   * Unique per Typeahead. Defaults to the group's position among the
   * Typeahead's children.
   */
  id?: string;
  /** The group's `TypeaheadOption`s. */
  children?: ReactNode;
}

/**
 * TypeaheadOptionGroup - A titled section of options inside `Typeahead`.
 *
 * Wrap `TypeaheadOption` children in it to show them under a title; groups are
 * separated by a divider. Filtering applies to the options inside, and a group
 * with no matching options is hidden along with its title. Read by the
 * Typeahead rather than rendered as written, so it only works as a direct
 * child of the Typeahead (or of a fragment there).
 *
 * @example
 * ```tsx
 * <Typeahead name="city" label="City">
 *   <TypeaheadOptionGroup label="Europe">
 *     <TypeaheadOption value="kyiv" label="Kyiv" />
 *     <TypeaheadOption value="paris" label="Paris" />
 *   </TypeaheadOptionGroup>
 *   <TypeaheadOptionGroup label="Asia">
 *     <TypeaheadOption value="tokyo" label="Tokyo" />
 *   </TypeaheadOptionGroup>
 * </Typeahead>
 * ```
 */
export const TypeaheadOptionGroup = ({
  children,
}: TypeaheadOptionGroupProps) => <>{children}</>;
