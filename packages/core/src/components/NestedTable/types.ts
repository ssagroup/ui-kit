import { Dispatch, SetStateAction } from 'react';
import { IconProps } from '@components/Icon/types';

export type NestedTableContextType = {
  /** Toggle icon shown while a group is collapsed. @default 'carrot-up' */
  collapsedIconName?: IconProps['name'];
  /** Toggle icon shown while a group is expanded. @default 'carrot-down' */
  expandedIconName?: IconProps['name'];
  /**
   * Whether groups start collapsed. Applies to every group in the table; a
   * single `WithNestedTableRow` can override it. Groups holding one row ignore
   * it, since they have no toggle to reopen with.
   *
   * @default false
   */
  defaultCollapsed?: boolean;
};

export type NestedTableRowContextType = {
  isCollapsed: boolean;
  isSubHeader: boolean;
  childRowsCount: number;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export type WithNestedTableRowProps = {
  /**
   * The group's rows. The first element becomes the sub-header that toggles the
   * group; the rest collapse under it.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Overrides the table-level `defaultCollapsed` for this group only. Ignored
   * when the group holds a single row.
   */
  defaultCollapsed?: boolean;
};
