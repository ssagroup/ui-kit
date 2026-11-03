import { MouseEvent, Ref } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { ContextMenu } from '@components/ContextMenu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  usePopoverContext,
} from '@components/Popover';

/** Where a column menu sits in its header cell. */
export const ColumnMenuAnchor = styled.span`
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

/** One action of a {@link ColumnMenu}. */
export interface ColumnMenuItem {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}

// Header cells are often clickable (sorting). The menu lives in a portal,
// but React still bubbles its events through the cell.
const stop = (event: MouseEvent) => event.stopPropagation();

/** Lives inside the popover so it can close it. */
const Menu = ({ items, label }: { items: ColumnMenuItem[]; label: string }) => {
  const { setOpen } = usePopoverContext();
  return (
    <ContextMenu<number>
      aria-label={label}
      css={{ minWidth: 180 }}
      items={items.map(({ label, disabled }, index) => ({
        value: index,
        label,
        disabled,
      }))}
      onAction={(index) => {
        items[index]?.onSelect();
        setOpen(false);
      }}
      onClick={stop}
    />
  );
};

interface ColumnMenuProps {
  items: ColumnMenuItem[];
  /** Accessible name of the menu. */
  label: string;
  /** Accessible name of the trigger button. */
  triggerLabel: string;
  /** Shows the lock icon, and keeps the trigger visible. */
  frozen?: boolean;
  ref?: Ref<HTMLSpanElement>;
  className?: string;
}

/**
 * The menu button of a table header cell: a trigger that shows on hover and
 * opens a list of actions. `ColumnFreezeMenu` and `DataTable`'s column menu
 * are both built on it.
 */
export const ColumnMenu = ({
  items,
  label,
  triggerLabel,
  frozen = false,
  ref,
  className,
}: ColumnMenuProps) => {
  const theme = useTheme();
  return (
    <ColumnMenuAnchor ref={ref} className={className}>
      <Popover placement="bottom-end">
        <PopoverTrigger asChild>
          <Trigger
            type="button"
            aria-label={triggerLabel}
            data-frozen={frozen ? 'true' : undefined}
            onClick={stop}>
            <Icon
              name={frozen ? 'lock' : 'more-vertical'}
              size={14}
              color={theme.colors.greyDarker80}
            />
          </Trigger>
        </PopoverTrigger>
        {/* No surface here: the menu draws its own. */}
        <PopoverContent>
          <Menu items={items} label={label} />
        </PopoverContent>
      </Popover>
    </ColumnMenuAnchor>
  );
};
