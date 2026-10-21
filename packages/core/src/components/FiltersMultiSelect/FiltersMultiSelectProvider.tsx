import { MutableRefObject } from 'react';
import { createSafeContext } from '@ssa-ui-kit/hooks';

import { UseFiltersMultiSelectStore } from './useFiltersMultiSelect';
import type { FilterMenuItem } from './utils';

export interface FiltersMultiSelectContextValue {
  store: UseFiltersMultiSelectStore;
  emptyNode?: React.ReactNode;
  /** Id of the options list, referenced by the search input. */
  listId?: string;
  /** Highlighted option, driven from the search input and the pointer. */
  activeValue?: string | null;
  setActiveValue?: (value: string | null) => void;
  /** The rendered options, kept here for the search input's keyboard. */
  itemsRef?: MutableRefObject<FilterMenuItem[]>;
}

export const [FiltersMultiSelectProvider, useFiltersMultiSelectContext] =
  createSafeContext<FiltersMultiSelectContextValue>(
    'useFiltersMultiSelect must be used within a FiltersMultiSelectProvider',
  );
