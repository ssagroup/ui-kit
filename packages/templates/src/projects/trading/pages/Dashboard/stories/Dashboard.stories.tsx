import type { Meta } from '@storybook/react';
import { USDT } from '@/trading/constants';
import {
  CurrencyProvider,
  GraphsProvider,
  HeaderProvider,
  PeriodProvider,
} from '@/trading/contexts';
import { Dashboard } from '@trading/pages/Dashboard';

export default {
  title: 'Templates/TradingDashboard',
  component: Dashboard,
  decorators: [
    (Story, { args }) => {
      return (
        <HeaderProvider>
          <CurrencyProvider currency={USDT}>
            <PeriodProvider>
              <GraphsProvider>
                <Story {...args} />
              </GraphsProvider>
            </PeriodProvider>
          </CurrencyProvider>
        </HeaderProvider>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof Dashboard>;

export const Default = {};
