import { useRef, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Meta } from '@storybook/react-webpack5';
import { TranslationProvider } from '@contexts';
import { USDT } from '@/fintech/constants';
import {
  CurrencyProvider,
  GraphsProvider,
  HeaderProvider,
  PeriodProvider,
} from '@/fintech/contexts';
import { translationConfig } from '@/fintech/translation';
import { AppLayoutProvider } from '../../AppLayout/context';
import { LayoutBase } from '../../AppLayout/LayoutBase';
import { RightPaneBase } from '../../AppLayout/RightPaneBase';
import { NotificationsPage } from '@fintech';
import { Header } from '../../AppLayout/components/Header';

export default {
  title: 'Templates/Notifications Page',
  component: NotificationsPage,
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
        <BrowserRouter>
          <TranslationProvider defaultTranslations={translationConfig}>
            <HeaderProvider>
              <CurrencyProvider currency={USDT}>
                <PeriodProvider>
                  <AppLayoutProvider isNavBarOpened={false} mainRef={ref}>
                    <LayoutBase>
                      <RightPaneBase ref={ref}>
                        <GraphsProvider>
                          <Routes>
                            <Route
                              path="/*"
                              element={
                                <Fragment>
                                  <Header />
                                  <Story {...args} />
                                </Fragment>
                              }
                            />
                          </Routes>
                        </GraphsProvider>
                      </RightPaneBase>
                    </LayoutBase>
                  </AppLayoutProvider>
                </PeriodProvider>
              </CurrencyProvider>
            </HeaderProvider>
          </TranslationProvider>
        </BrowserRouter>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof NotificationsPage>;

export const Default = {};
