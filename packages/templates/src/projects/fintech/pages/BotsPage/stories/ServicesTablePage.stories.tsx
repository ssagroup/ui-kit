import { useRef, Fragment } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Meta } from '@storybook/react';
import { TranslationProvider } from '@contexts';
import { USDT } from '@/fintech/constants';
import {
  CurrencyProvider,
  GraphsProvider,
  HeaderProvider,
  PeriodProvider,
  TableProvider,
} from '@/fintech/contexts';
import { translationConfig } from '@/fintech/translation';
import { Toastify } from '@/fintech/components';
import { AppLayoutProvider } from '../../AppLayout/context';
import { LayoutBase } from '../../AppLayout/LayoutBase';
import { RightPaneBase } from '../../AppLayout/RightPaneBase';
import { BotsPage } from '../BotsPage';
import { Header } from '../../AppLayout/components/Header';
import { TOASTIFY_OPTIONS } from '../../../../../consts';

export default {
  title: 'Templates/Services Table Page',
  component: BotsPage,
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
                        <TableProvider>
                          <PeriodProvider>
                            <RouterProvider
                              router={createBrowserRouter([
                                {
                                  path: '/*',
                                  element: (
                                    <Fragment>
                                      <Header />
                                      <Story {...args} />
                                      <Toastify {...TOASTIFY_OPTIONS} />
                                    </Fragment>
                                  ),
                                },
                              ])}
                            />
                          </PeriodProvider>
                        </TableProvider>
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
} as Meta<typeof BotsPage>;

export const Default = {};
