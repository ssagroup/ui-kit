import { CommonProps } from '@global-types/emotion';

/**
 * Props for DropdownOption component
 *
 * Record type that allows any string or number properties.
 * Common properties include: value, label, children, etc.
 */
export type DropdownOptionProps = Record<string, string | number>;

/**
 * Props for DropdownOptions component
 *
 * Container component for dropdown option items. Renders as a scrollable
 * list with proper ARIA attributes.
 */
export interface DropdownItemsListProps extends CommonProps {
  /**
   * ARIA label reference
   * Associates the listbox with its label
   */
  ariaLabelledby?: string;

  /**
   * Unique identifier for the options container
   */
  id?: string;

  /**
   * DropdownOption components as children
   */
  children?: React.ReactNode;
}
