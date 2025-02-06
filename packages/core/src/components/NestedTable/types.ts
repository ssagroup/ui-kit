export type NestedTableRowChildren = React.ReactElement<
  React.PropsWithChildren<{
    isCollapsed?: boolean;
  }>
>;

export type NestedTableRowContextType = {
  isCollapsed: boolean;
  isSubHeader: boolean;
  childRowsCount: number;
};
