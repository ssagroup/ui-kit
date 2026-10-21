import { MouseEvent } from 'react';

import { ContextMenu, ContextMenuProps } from '@components/ContextMenu';

import { TypeaheadItemsListProps, TypeaheadValue } from '../types';
import { useTypeaheadContext } from '../Typeahead.context';

/** Matches the list's previous fixed cap. */
const MAX_HEIGHT = 350;

// Focus has to stay in the input while the list is used with the pointer, so
// pressing inside the list must not move it.
const keepInputFocus = (event: MouseEvent) => event.preventDefault();

/**
 * TypeaheadOptions - The Typeahead's option list: a `ContextMenu` driven from
 * the Typeahead's input. The options themselves come from the `TypeaheadOption`
 * children of `Typeahead`, filtered by the typed text. Rendered by
 * `Typeahead` itself; reads everything from the Typeahead context.
 *
 * @example
 * ```tsx
 * // Inside a Typeahead's popup
 * <TypeaheadOptions noItemsMessage="Nobody matches" />
 * ```
 */
export const TypeaheadOptions = ({
  noItemsMessage = 'No matches found',
  className,
}: TypeaheadItemsListProps) => {
  const context = useTypeaheadContext();

  const selection = (
    context.isMultiple
      ? { selectionMode: 'multiple', value: context.selectedItems }
      : { selectionMode: 'single', value: context.selectedItems[0] ?? null }
  ) as ContextMenuProps<TypeaheadValue>;

  return (
    <ContextMenu<TypeaheadValue>
      {...selection}
      id={context.listId}
      className={className}
      items={context.menuItems}
      indicator="check"
      activeValue={context.activeValue}
      onActiveValueChange={context.setActiveValue}
      onAction={context.handleOptionAction}
      emptyState={noItemsMessage}
      maxHeight={MAX_HEIGHT}
      // Not a tab stop: the keyboard is handled by the input.
      tabIndex={-1}
      onMouseDown={keepInputFocus}
    />
  );
};
