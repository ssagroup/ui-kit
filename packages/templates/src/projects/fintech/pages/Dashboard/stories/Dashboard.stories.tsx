import { useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Meta } from '@storybook/react-webpack5';
import { TranslationProvider } from '@contexts';
import { USDT } from '@/fintech/constants';
import {
  CurrencyProvider,
  GraphsProvider,
  HeaderProvider,
  PeriodProvider,
} from '@/fintech/contexts';
import { FinTechDashboard } from '@fintech/pages/Dashboard';
import { translationConfig } from '@/fintech/translation';
import { AppLayoutProvider } from '../../AppLayout/context';
import { LayoutBase } from '../../AppLayout/LayoutBase';
import { RightPaneBase } from '../../AppLayout/RightPaneBase';

export default {
  title: 'Templates/FinTech Dashboard',
  component: FinTechDashboard,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
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
} as Meta<typeof FinTechDashboard>;

export const Default = {};
