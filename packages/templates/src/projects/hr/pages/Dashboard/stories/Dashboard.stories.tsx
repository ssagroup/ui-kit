import { useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TranslationProvider } from '@ssa-ui-kit/core';
import type { Meta } from '@storybook/react-webpack5';
import { HeaderProvider } from '@hr/contexts';
import { Dashboard } from '@hr/pages/Dashboard';
import { translationConfig } from '@hr/translation';
import { AppLayoutProvider } from '@hr/components/AppLayout/context';
import { RightPaneBase } from '@/hr/components/AppLayout/RightPaneBase';

export default {
  title: 'Templates/PeopleOps Dashboard',
  component: Dashboard,
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
            <AppLayoutProvider mainRef={ref}>
              <RightPaneBase ref={ref}>
                <RouterProvider
                  router={createBrowserRouter([
                    {
                      path: '/*',
                      element: <Story {...args} />,
                    },
                  ])}
                />
              </RightPaneBase>
            </AppLayoutProvider>
          </HeaderProvider>
        </TranslationProvider>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof Dashboard>;

export const Default = {};
