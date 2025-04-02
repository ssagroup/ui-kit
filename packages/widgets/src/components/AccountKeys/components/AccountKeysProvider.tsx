import { createSafeContext } from '@ssa-ui-kit/hooks';

import { UseAccountKeysStore } from '../useAccountKeys';

export type AccountKeysContextValue = {
  store: UseAccountKeysStore;
};

export const [AccountKeysProvider, useAccountKeysContext] =
  createSafeContext<AccountKeysContextValue>(
    'useExchangeAccount must be used within a AccountKeysProvider',
  );
