import { createSafeContext } from '@ssa-ui-kit/hooks';

import { UseFiltersMultiSelectStore } from './useFiltersMultiSelect';

export interface FiltersMultiSelectContextValue {
  store: UseFiltersMultiSelectStore;
  emptyNode?: React.ReactNode;
}

export const [FiltersMultiSelectProvider, useFiltersMultiSelectContext] =
  createSafeContext<FiltersMultiSelectContextValue>(
    'useFiltersMultiSelect must be used within a FiltersMultiSelectProvider',
  );
