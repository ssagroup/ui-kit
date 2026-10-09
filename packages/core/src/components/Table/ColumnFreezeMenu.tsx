import { MouseEvent, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  usePopoverContext,
} from '@components/Popover';
import { ColumnFreezeMenuProps, ColumnId, FrozenColumns } from './types';
import { useColumnFreezeContext } from './ColumnFreezeContext';

const Anchor = styled.span`
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;

  border: none;
  border-radius: 4px;
  background: none;
  cursor: pointer;

  &:hover,
  &[data-state='open'] {
    background: ${({ theme }) => theme.colors.greyLighter};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue};
    outline-offset: -2px;
  }

  /* Hidden until the header is hovered, but it keeps its space so showing it
     never shifts the header text. Always shown on a frozen column, so the
     user can see what is frozen, and on touch screens, which cannot hover. */
  opacity: 0;
  transition: opacity 0.15s ease-in-out;

  &:focus-visible,
  &[data-state='open'],
  &[data-frozen='true'] {
    opacity: 1;
  }

  /* Last: stylelint orders selectors by specificity, and this one is the
     most specific. */
  th:hover & {
    opacity: 1;
  }

  @media (hover: none) {
    opacity: 1;
  }
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;

  border: none;
  border-radius: 6px;
  background: none;
  color: ${({ theme }) => theme.colors.greyDarker};
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.greyLighter};
  }
`;

type MenuEntry = { label: string; next: Required<FrozenColumns> };

// Header cells are often clickable (sorting). The menu lives in a portal,
// but React still bubbles its events through the cell.
const stop = (event: MouseEvent) => event.stopPropagation();

/** Lives inside the popover so it can close it. */
const MenuItems = ({
  items,
  onSelect,
}: {
  items: MenuEntry[];
  onSelect: (next: Required<FrozenColumns>) => void;
}) => {
  const { setOpen } = usePopoverContext();
  return items.map(({ label, next }) => (
    <MenuItem
      key={label}
      type="button"
      onClick={(event) => {
        stop(event);
        onSelect(next);
        setOpen(false);
      }}>
      {label}
    </MenuItem>
  ));
};

const without = (ids: ColumnId[], id: ColumnId) =>
  ids.filter((other) => String(other) !== String(id));

/**
 * ColumnFreezeMenu - The freeze/unfreeze menu in a table header cell
 *
 * `TableCellHeader` renders it for you when its `Table` has `freezeControls`.
 * Render it yourself only in a custom header cell, passing the column's id;
 * without one it falls back to the `columnId` or position of the `th` it
 * sits in.
 *
 * Any column can be frozen to either edge. It stays where it is until
 * scrolling would take it out of view, then sticks to that edge while the
 * columns between slide underneath.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <TableCell as="th" data-column-id="email">
 *   Email
 *   <ColumnFreezeMenu columnId="email" />
 * </TableCell>
 * ```
 *
 * @see {@link Table} - `freezeControls` and `frozenColumns`
 * @see {@link useColumnFreezeContext} - whether the table wants the menu
 *
 * @accessibility
 * - The trigger is a labelled button, reachable by keyboard even while hidden
 * - Clicks inside the menu do not reach the header cell, so they never sort
 */
export const ColumnFreezeMenu = ({ columnId }: ColumnFreezeMenuProps) => {
  const columnFreeze = useColumnFreezeContext();
  const theme = useTheme();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [cellId, setCellId] = useState<ColumnId | null>(null);

  // Without an explicit id, the column is only known once the cell is in a row.
  useLayoutEffect(() => {
    if (columnId !== undefined) return;
    const cell = anchorRef.current?.closest('th, td') as
      | HTMLTableCellElement
      | null
      | undefined;
    if (!cell) return;
    const next = cell.dataset.columnId ?? cell.cellIndex;
    if (next !== cellId) setCellId(next);
  });

  const id = columnId ?? cellId;
  if (!columnFreeze || id === null) {
    return <Anchor ref={anchorRef} />;
  }

  const { start, end } = columnFreeze.frozenColumns;
  const key = String(id);
  const frozenAt = start.some((other) => String(other) === key)
    ? 'start'
    : end.some((other) => String(other) === key)
      ? 'end'
      : null;
  const rest = { start: without(start, id), end: without(end, id) };

  const items: MenuEntry[] = frozenAt
    ? [{ label: 'Unfreeze column', next: rest }]
    : [
        {
          label: 'Freeze to the left',
          next: { start: [...rest.start, id], end: rest.end },
        },
        {
          label: 'Freeze to the right',
          next: { start: rest.start, end: [...rest.end, id] },
        },
      ];
  const others = rest.start.length + rest.end.length;
  if (others > 0) {
    items.push({ label: 'Unfreeze all', next: { start: [], end: [] } });
  }

  return (
    <Anchor ref={anchorRef}>
      <Popover placement="bottom-end" color="white" hasShadow>
        <PopoverTrigger asChild>
          <Trigger
            type="button"
            aria-label="Freeze column options"
            data-frozen={frozenAt ? 'true' : undefined}
            onClick={stop}>
            <Icon
              name={frozenAt ? 'lock' : 'more-vertical'}
              size={14}
              color={theme.colors.greyDarker80}
            />
          </Trigger>
        </PopoverTrigger>
        <PopoverContent css={{ padding: 4, minWidth: 180 }}>
          <MenuItems items={items} onSelect={columnFreeze.setFrozenColumns} />
        </PopoverContent>
      </Popover>
    </Anchor>
  );
};

export default ColumnFreezeMenu;
