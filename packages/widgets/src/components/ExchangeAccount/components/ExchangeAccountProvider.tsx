import { createSafeContext } from '@ssa-ui-kit/hooks';

import { ExchangeAccountProps } from '../types';

export type DrawerContextValue = Pick<
  ExchangeAccountProps,
  | 'data'
  | 'onClick'
  | 'onDelete'
  | 'status'
  | 'platform'
  | 'title'
  | 'disabled'
  | 'pieChartProps'
>;

export const [ExchangeAccountProvider, useExchangeAccountContext] =
  createSafeContext<DrawerContextValue>(
    'useExchangeAccount must be used within a ExchangeAccountProvider',
  );
