import { HTMLAttributes } from 'react';
import Icon from '@components/Icon';
import { EXPANDER_ATTR } from '@components/Table/utils';
import { NestedTableCell } from './NestedTableCell';
import { useNestedTableContext, useNestedTableRowContext } from '../hooks';

export const NestedTableCellSubHeader = ({
  isHeader,
  ...props
}: {
  isHeader?: boolean;
} & HTMLAttributes<HTMLTableCellElement>) => {
  const { collapsedIconName = 'carrot-up', expandedIconName = 'carrot-down' } =
    useNestedTableContext();
  const {
    childRowsCount,
    isSubHeader: isSubHeaderGlobal,
    isCollapsed,
  } = useNestedTableRowContext();
  const isSubHeader = childRowsCount > 1 ? isSubHeaderGlobal : false;
  const content = isHeader ? (
    ''
  ) : isSubHeader ? (
    <Icon
      name={isCollapsed ? collapsedIconName : expandedIconName}
      size={18}
      css={{ cursor: 'pointer' }}
      tooltip=""
      data-testid="toggle-icon"
      data-type={isCollapsed ? 'collapsed' : 'expanded'}
    />
  ) : (
    ''
  );
  return (
    <NestedTableCell
      css={{ width: 20, '& div': { width: 20 } }}
      as={isHeader ? 'th' : 'td'}
      // Tells the table this column is its own, not the app's: it is not
      // numbered, and it freezes with the columns frozen to the left.
      {...{ [EXPANDER_ATTR]: 'true' }}
      {...props}>
      {content}
    </NestedTableCell>
  );
};
