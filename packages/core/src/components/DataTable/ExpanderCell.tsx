import Icon from '@components/Icon';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import { EXPANDER_ATTR } from '@components/Table/utils';
import * as S from './styles';

// Not one of the user's columns; freezes with the column after it.
const expander = { [EXPANDER_ATTR]: 'true' };

/** The empty header above the expand buttons. */
export const ExpanderHeaderCell = () => (
  <TableCellHeader
    css={S.expanderCell}
    resizable={false}
    freezable={false}
    {...expander}>
    <span css={S.visuallyHidden}>Expand</span>
  </TableCellHeader>
);

interface ExpanderCellProps {
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

/** A row's expand/collapse button, or nothing for a row without children. */
export const ExpanderCell = ({
  hasChildren,
  isExpanded,
  onToggle,
}: ExpanderCellProps) => (
  <TableCell css={S.expanderCell}>
    {hasChildren && (
      <button
        type="button"
        css={S.expanderButton}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
        onClick={onToggle}>
        <Icon name={isExpanded ? 'carrot-down' : 'carrot-right'} size={12} />
      </button>
    )}
  </TableCell>
);
