import React, { useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Meta } from '@storybook/react';
import { TranslationProvider } from '@contexts';
import { USDT } from '@/trading/constants';
import {
  CurrencyProvider,
  GraphsProvider,
  HeaderProvider,
  PeriodProvider,
} from '@/trading/contexts';
import { TradingDashboard } from '@trading/pages/Dashboard';
import { translationConfig } from '@/trading/translation';
import { AppLayoutProvider } from '../../AppLayout/context';
import { LayoutBase } from '../../AppLayout/LayoutBase';
import { RightPaneBase } from '../../AppLayout/RightPaneBase';

export default {
  title: 'Templates/TradingDashboard',
  component: TradingDashboard,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  decorators: [
    (Story, { args }) => {
      const ref = useRef<HTMLElement>(null);
      return (
        <TranslationProvider defaultTranslations={translationConfig}>
          <HeaderProvider>
            <CurrencyProvider currency={USDT}>
              <PeriodProvider>
                <AppLayoutProvider isNavBarOpened={false} mainRef={ref}>
                  <LayoutBase>
                    <RightPaneBase ref={ref}>
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
                    </RightPaneBase>
                  </LayoutBase>
                </AppLayoutProvider>
              </PeriodProvider>
            </CurrencyProvider>
          </HeaderProvider>
        </TranslationProvider>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof TradingDashboard>;

export const Default = {};
