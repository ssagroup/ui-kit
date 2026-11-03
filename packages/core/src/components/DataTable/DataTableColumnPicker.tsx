import { ReactNode } from 'react';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { ContextMenu } from '@components/ContextMenu';
import { Popover, PopoverContent, PopoverTrigger } from '@components/Popover';
import { DataTableColumn, DataTableColumnState } from './types';
import { getFullOrder, toColumnState } from './utils';

/**
 * Props of {@link DataTableColumnPicker}.
 *
 * @example
 * ```tsx
 * <DataTableColumnPicker
 *   columns={columns}
 *   columnState={columnState}
 *   onColumnStateChange={setColumnState}
 * />
 * ```
 */
export interface DataTableColumnPickerProps<Row> {
  /** The same columns the table gets. */
  columns: DataTableColumn<Row>[];
  /** The table's column state, as passed to its `columnState`. */
  columnState?: Partial<DataTableColumnState>;
  /** Called with the whole new column state when a column is shown or hidden. */
  onColumnStateChange: (columnState: DataTableColumnState) => void;
  /**
   * Text of the button that opens the list.
   * @default 'Columns'
   */
  label?: ReactNode;
  /** Class name of the button. */
  className?: string;
}

/**
 * DataTableColumnPicker - A button that opens a checklist of a
 * {@link DataTable}'s columns, to show or hide each one.
 *
 * Place it wherever the page keeps its table controls, such as next to the
 * filters, and share a controlled `columnState` between it and the table.
 * Columns are listed in display order. Columns with `hideable: false` stay
 * checked and cannot be cleared, and neither can the last one shown.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * const [columnState, setColumnState] = useState<Partial<DataTableColumnState>>({});
 *
 * <DataTableColumnPicker
 *   columns={columns}
 *   columnState={columnState}
 *   onColumnStateChange={setColumnState}
 * />
 * <DataTable
 *   data={rows}
 *   columns={columns}
 *   columnState={columnState}
 *   onColumnStateChange={setColumnState}
 * />
 * ```
 *
 * @see {@link DataTable} - `hideableColumns` adds "Hide column" to its header menu
 *
 * @accessibility
 * - The list is a multi-select listbox: arrows move, Space or Enter toggles
 * - Escape closes it and returns focus to the button
 */
export const DataTableColumnPicker = <Row,>({
  columns,
  columnState,
  onColumnStateChange,
  label = 'Columns',
  className,
}: DataTableColumnPickerProps<Row>) => {
  const state = toColumnState(columnState);
  const byId = new Map(columns.map((column) => [column.id, column]));
  const order = getFullOrder(columns, state.order);
  const hidden = new Set(state.hidden);
  const shown = order.filter((id) => !hidden.has(id));

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger asChild>
        <Button
          size="small"
          variant="secondary"
          endIcon={<Icon name="carrot-down" size={12} />}
          className={className}>
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ContextMenu<string>
          aria-label="Shown columns"
          css={{ minWidth: 200 }}
          selectionMode="multiple"
          indicator="checkbox"
          value={shown}
          items={order.map((id) => {
            const { header, hideable } = byId.get(id)!;
            return {
              value: id,
              label: header,
              textValue: typeof header === 'string' ? header : id,
              // A column that may not be hidden can still be brought back
              // when columnState hid it.
              disabled:
                (hideable === false && !hidden.has(id)) ||
                (shown.length === 1 && shown[0] === id),
            };
          })}
          onChange={(_values, toggled) =>
            onColumnStateChange({
              ...state,
              hidden: hidden.has(toggled)
                ? state.hidden.filter((id) => id !== toggled)
                : [...state.hidden, toggled],
            })
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default DataTableColumnPicker;
