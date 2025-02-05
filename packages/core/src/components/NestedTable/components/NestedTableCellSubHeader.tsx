import Icon from '@components/Icon';
import { NestedTableCell } from './NestedTableCell';
import { useNestedTableRowContext } from '../useNestedTableRowContext';

export const NestedTableCellSubHeader = ({
  isHeader,
  ...props
}: {
  isHeader?: boolean;
}) => {
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
      name={isCollapsed ? 'carrot-up' : 'carrot-down'}
      size={18}
      css={{ cursor: 'pointer' }}
    />
  ) : (
    ''
  );
  return (
    <NestedTableCell css={{ width: 20, '& div': { width: 20 } }} {...props}>
      {content}
    </NestedTableCell>
  );
};
