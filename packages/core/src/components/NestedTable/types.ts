import { Dispatch, SetStateAction } from 'react';

export type NestedTableRowContextType = {
  isCollapsed: boolean;
  isSubHeader: boolean;
  childRowsCount: number;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};
