import { useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TranslationProvider } from '@ssa-ui-kit/core';
import type { Meta } from '@storybook/react';
import { HeaderProvider } from '@peopleops/contexts';
import { Dashboard } from '@peopleops/pages/Dashboard';
import { translationConfig } from '@peopleops/translation';
import { AppLayoutProvider } from '@peopleops/components/AppLayout/context';
import { RightPaneBase } from '@/peopleops/components/AppLayout/RightPaneBase';

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
