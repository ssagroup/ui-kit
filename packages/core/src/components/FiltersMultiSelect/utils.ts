import React from 'react';

import {
  ContextMenuIncludeExcludeEntry,
  ContextMenuIncludeExcludeType,
  ContextMenuItem,
} from '@components/ContextMenu';

import type { FiltersMultiSelectOptionProps } from './components/FiltersMultiSelectOption';
import {
  Filter,
  SelectedFilter,
  UseFiltersMultiSelectStore,
} from './useFiltersMultiSelect';

/** A ContextMenu row together with the filter it stands for. */
export type FilterMenuItem = ContextMenuItem<string> & { filter: Filter };

/** The store calls a group's state `group`; ContextMenu calls it `selected`. */
const toMenuType = (
  type: SelectedFilter['type'],
): ContextMenuIncludeExcludeType => (type === 'group' ? 'selected' : type);

const toFilterType = (
  type: ContextMenuIncludeExcludeType,
): SelectedFilter['type'] => (type === 'selected' ? 'group' : type);

type OptionElement = React.ReactElement<FiltersMultiSelectOptionProps>;

/** Option elements among `children`, looking inside Fragments. */
const toOptionElements = (children: React.ReactNode): OptionElement[] =>
  React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return [];
    if (child.type === React.Fragment) {
      return toOptionElements(child.props.children);
    }
    // Anything that is not an option (no `filter`) is skipped, not read.
    return (child.props as Partial<FiltersMultiSelectOptionProps>).filter
      ? [child as OptionElement]
      : [];
  });

/** Reads `FiltersMultiSelectOption` children into ContextMenu items. */
export const toFilterMenuItems = (children: React.ReactNode) =>
  toOptionElements(children).map<FilterMenuItem>(
    ({ props: { filter, children: label } }) => ({
      value: filter.id,
      label,
      textValue: filter.label,
      selectOnly: filter.group,
      filter,
    }),
  );

/** The store's selection in ContextMenu's `includeExclude` shape. */
export const toMenuSelection = (
  selectedFilters: SelectedFilter[],
): ContextMenuIncludeExcludeEntry<string>[] =>
  selectedFilters.map(({ id, type }) => ({
    value: id,
    type: toMenuType(type),
  }));

/** The store's current type for a filter, in ContextMenu's terms. */
export const getMenuType = (
  store: UseFiltersMultiSelectStore,
  id: string,
): ContextMenuIncludeExcludeType | undefined => {
  const selected = store.isSelected(id);
  return selected ? toMenuType(selected.type) : undefined;
};

/** Selects `filter` as `type`, or unselects it when `type` is undefined. */
export const setFilterType = (
  store: UseFiltersMultiSelectStore,
  { id, label }: Filter,
  type: ContextMenuIncludeExcludeType | undefined,
) => {
  if (type) {
    store.selectFilters({ id, label, type: toFilterType(type) });
    return;
  }
  const selected = store.isSelected(id);
  if (selected) store.unselectFilters(selected);
};
