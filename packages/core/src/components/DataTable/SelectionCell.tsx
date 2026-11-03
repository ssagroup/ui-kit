import { useId } from 'react';
import Checkbox from '@components/Checkbox';
import Radio from '@components/Radio';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import { EXPANDER_ATTR } from '@components/Table/utils';
import { DataTableSelectionMode } from './types';
import * as S from './styles';

// Marked as an expander: the column does not count as one of the user's, and
// it freezes to the start together with the column after it.
const expander = { [EXPANDER_ATTR]: 'true' };

interface SelectionHeaderCellProps {
  mode: Exclude<DataTableSelectionMode, 'none'>;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  onToggle: () => void;
}

/** The header of the selection column: select-all, or a label for radios. */
export const SelectionHeaderCell = ({
  mode,
  checked,
  indeterminate,
  disabled,
  onToggle,
}: SelectionHeaderCellProps) => (
  <TableCellHeader
    css={S.selectionCell}
    resizable={false}
    freezable={false}
    {...expander}>
    {mode === 'multiple' ? (
      <Checkbox
        checked={checked}
        isIndeterminate={indeterminate}
        disabled={disabled}
        onChange={onToggle}
        text={<span css={S.visuallyHidden}>Select all rows</span>}
      />
    ) : (
      <span css={S.visuallyHidden}>Select</span>
    )}
  </TableCellHeader>
);

interface SelectionCellProps {
  mode: Exclude<DataTableSelectionMode, 'none'>;
  /** Groups the radios of one table. */
  name: string;
  rowId: string;
  label: string;
  checked: boolean;
  /** Some of the rows below are selected, not all. */
  indeterminate?: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}

/** A row's checkbox or radio. */
export const SelectionCell = ({
  mode,
  name,
  rowId,
  label,
  checked,
  indeterminate = false,
  disabled,
  onChange,
}: SelectionCellProps) => {
  const radioId = useId();
  return (
    <TableCell css={S.selectionCell}>
      {mode === 'multiple' ? (
        <Checkbox
          checked={checked}
          isIndeterminate={indeterminate}
          disabled={disabled}
          // A partly selected row selects the rest on click.
          onChange={() => onChange(!checked)}
          text={<span css={S.visuallyHidden}>{label}</span>}
        />
      ) : (
        <>
          {/* Radio takes its text as a plain string, shown; name it here. */}
          <label htmlFor={radioId} css={S.visuallyHidden}>
            {label}
          </label>
          <Radio
            id={radioId}
            name={name}
            value={rowId}
            checked={checked}
            disabled={disabled}
            onChange={() => onChange(true)}
          />
        </>
      )}
    </TableCell>
  );
};
