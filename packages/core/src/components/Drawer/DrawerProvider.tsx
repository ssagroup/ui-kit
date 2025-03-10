import { createSafeContext } from '@ssa-ui-kit/hooks';

import { UseDrawerStore } from './useDrawer';

export interface DrawerContextValue {
  store: UseDrawerStore;
}

export const [DrawerProvider, useDrawerContext] =
  createSafeContext<DrawerContextValue>(
    'useDrawer must be used within a DrawerProvider',
  );
