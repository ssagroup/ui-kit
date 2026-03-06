/**
 * Checkbox data structure
 * Maps filter group names to arrays of selected item names
 */
export type CheckboxData = Record<string, string[]>;

/**
 * Not changed data structure
 * Tracks checkbox states that haven't been modified
 */
export type NotChangedData = Record<string, Record<string, boolean>>;

/**
 * Single filter item configuration
 * Represents an individual checkbox option within a filter group
 */
export interface SingleItem {
  /**
   * Unique identifier for the item
   */
  key: string;

  /**
   * Item name/identifier
   */
  name: string;

  /**
   * Whether the item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Item content configuration
   */
  content: {
    /**
     * State path for nested data structures
     */
    statePath: string[];

    /**
     * Display text for the checkbox label
     */
    text: string;
  };
}

/**
 * Accordion group information
 * Represents a filter group with collapsible accordion functionality
 */
export interface AccordionInfo {
  /**
   * Unique identifier for the accordion group
   */
  id: string;

  /**
   * Group title displayed in accordion header
   */
  title: string;

  /**
   * Whether the accordion is initially open
   */
  isOpened: boolean;

  /**
   * ARIA controls attribute for accessibility
   */
  ariaControls: string;

  /**
   * Whether the entire group is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Filter items within this group
   */
  items: Record<string, SingleItem>;

  /**
   * Currently selected items (committed state)
   */
  selectedItems: string[];

  /**
   * Draft selected items (uncommitted changes)
   * Used to track temporary selections before submit
   */
  selectedItemsDraft?: string[];
}

/**
 * Table filter configuration
 * Maps filter group names to their accordion information
 */
export type TableFilterConfig = Record<string, AccordionInfo>;

/**
 * Props for the TableFilters component
 *
 * A comprehensive filter component for table data that provides grouped checkbox
 * filters in a popover with accordion-style collapsible groups. Supports submit,
 * reset, and clear actions with draft state management.
 *
 * @example
 * ```tsx
 * const filterConfig: TableFilterConfig = {
 *   status: {
 *     id: 'status',
 *     title: 'Status',
 *     isOpened: true,
 *     ariaControls: 'status-controls',
 *     items: {
 *       active: {
 *         key: 'active',
 *         name: 'active',
 *         content: { statePath: [], text: 'Active' },
 *       },
 *       inactive: {
 *         key: 'inactive',
 *         name: 'inactive',
 *         content: { statePath: [], text: 'Inactive' },
 *       },
 *     },
 *     selectedItems: [],
 *   },
 * };
 *
 * <TableFilters
 *   checkboxData={filterConfig}
 *   onSubmit={() => console.log('Filters applied')}
 *   onReset={() => console.log('Filters reset')}
 *   onClear={() => console.log('Filters cleared')}
 * />
 * ```
 */
export interface TableFiltersView {
  /**
   * Filter configuration data
   * Maps group names to accordion information with checkbox items
   */
  checkboxData?: TableFilterConfig;

  /**
   * Callback when filters are submitted/applied
   * Called when user clicks submit button
   */
  onSubmit?: () => void;

  /**
   * Callback when filters are reset
   * Called when user clicks cancel button (resets to initial state)
   */
  onReset?: () => void;

  /**
   * Callback when filters are cleared
   * Called when user clicks clear button (removes all selections)
   */
  onClear?: () => void;

  /**
   * Callback when a checkbox is toggled
   * Provides group name and item name for the toggled checkbox
   */
  onCheckboxToggle?: (groupName: string, name: string) => void;

  /**
   * Callback when filter button visibility changes
   * Called when filter groups are added/removed to show/hide filter button
   */
  handleMoreButtonVisibleChange?: (isVisible: boolean) => void;
}
