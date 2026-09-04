import { Dispatch, SetStateAction } from 'react';
import { IconProps } from '@components/Icon/types';

export type NestedTableContextType = {
  collapsedIconName?: IconProps['name'];
  expandedIconName?: IconProps['name'];
  defaultCollapsed?: boolean;
};

export type NestedTableRowContextType = {
  isCollapsed: boolean;
  isSubHeader: boolean;
  childRowsCount: number;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export type WithNestedTableRowProps = {
  children: React.ReactNode | React.ReactNode[];
  defaultCollapsed?: boolean;
};
