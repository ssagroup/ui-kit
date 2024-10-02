import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Meta } from '@storybook/react';
import { USDT } from '@/trading/constants';
import {
  CurrencyProvider,
  GraphsProvider,
  HeaderProvider,
  PeriodProvider,
} from '@/trading/contexts';
import { TradingDashboard } from '@trading/pages/Dashboard';

export default {
  title: 'Templates/TradingDashboard',
  component: TradingDashboard,
  decorators: [
    (Story, { args }) => {
      return (
        <HeaderProvider>
          <CurrencyProvider currency={USDT}>
            <PeriodProvider>
              <GraphsProvider>
                <RouterProvider
                  router={createBrowserRouter([
                    {
                      path: '/*',
                      element: <Story {...args} />,
                    },
                  ])}
                />
              </GraphsProvider>
            </PeriodProvider>
          </CurrencyProvider>
        </HeaderProvider>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof TradingDashboard>;

export const Default = {};
