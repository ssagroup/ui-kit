import React, { MouseEvent, useLayoutEffect, type HTMLAttributes } from 'react';

import { ContextMenu } from '@components/ContextMenu';

import { useFiltersMultiSelectContext } from '../FiltersMultiSelectProvider';
import { setFilterType, toFilterMenuItems, toMenuSelection } from '../utils';

/**
 * FiltersMultiSelectOptions - The options list of a `FiltersMultiSelect`.
 *
 * Renders its `FiltersMultiSelectOption` children as an include / exclude
 * `ContextMenu`: + and − on each row (one check-circle on group rows), Enter
 * in the search input cycles the highlighted row. Shows the
 * `FiltersMultiSelect` `emptyNode` when it has no options.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * <FiltersMultiSelect store={store}>
 *   <FiltersMultiSelectOptions>
 *     {filters.map((filter) => (
 *       <FiltersMultiSelectOption key={filter.id} filter={filter}>
 *         {filter.label}
 *       </FiltersMultiSelectOption>
 *     ))}
 *   </FiltersMultiSelectOptions>
 * </FiltersMultiSelect>
 * ```
 *
 * @see {@link FiltersMultiSelect} - Parent component
 * @see {@link FiltersMultiSelectOption} - One filter row
 */
export const FiltersMultiSelectOptions = ({
  children,
  onMouseDown,
  ...props
}: { children: React.ReactNode } & Omit<
  HTMLAttributes<HTMLUListElement>,
  'onChange' | 'defaultValue' | 'children'
>) => {
  const { store, emptyNode, listId, activeValue, setActiveValue, itemsRef } =
    useFiltersMultiSelectContext();

  const items = toFilterMenuItems(children);

  useLayoutEffect(() => {
    if (itemsRef) itemsRef.current = items;
    // A highlight the list no longer shows (e.g. filtered out by the search)
    // would leave the input pointing at a missing option.
    if (
      activeValue != null &&
      !items.some((item) => item.value === activeValue)
    ) {
      setActiveValue?.(null);
    }
  });

  return (
    <ContextMenu<string>
      css={{ width: '100%' }}
      tabIndex={-1}
      {...props}
      onMouseDown={(event: MouseEvent<HTMLUListElement>) => {
        onMouseDown?.(event);
        // Focus stays in the search input while the list is used with the
        // pointer; a consumer handler cannot opt out of that.
        event.preventDefault();
      }}
      id={listId}
      selectionMode="includeExclude"
      items={items}
      value={toMenuSelection(store.selectedFilters)}
      onChange={(next, changed) => {
        const item = items.find((entry) => entry.value === changed);
        if (!item) return;
        const type = next.find((entry) => entry.value === changed)?.type;
        setFilterType(store, item.filter, type);
      }}
      activeValue={activeValue ?? null}
      onActiveValueChange={setActiveValue}
      emptyState={emptyNode}
    />
  );
};
