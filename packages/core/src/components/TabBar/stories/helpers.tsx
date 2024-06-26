import React from 'react';
import { Fragment, useLayoutEffect } from 'react';
import { DecoratorFunction } from '@storybook/types';
import { useTabBarContext, TabBarContextProvider } from '@components/TabBar';
import TabBar from '../TabBar';
import { TabProps } from '../types';

type Args = Parameters<typeof TabBar>[0];

export const TabBarWrapper = ({
  children,
  selectedTabId,
  renderContent,
}: {
  children: React.ReactNode;
  selectedTabId?: TabProps['tabId'];
  renderContent?: TabProps['renderContent'];
}) => {
  const { activeTab, setActiveTab } = useTabBarContext();
  useLayoutEffect(() => {
    if (selectedTabId && renderContent) {
      setActiveTab({
        tabId: selectedTabId,
        renderContent,
      });
    }
  }, []);

  return (
    <Fragment>
      <div>{children}</div>
      {activeTab?.renderContent()}
    </Fragment>
  );
};

export const TabContents = ({
  text,
  id,
  labelledBy,
}: {
  text: string;
  id?: string;
  labelledBy?: string;
}) => {
  return (
    <p id={id} role="tabpanel" tabIndex={0} aria-labelledby={labelledBy}>
      {text}
    </p>
  );
};

/* istanbul ignore next */
export const TabBarDecorator: DecoratorFunction<
  {
    component: typeof TabBar;
    storyResult: React.ReactElement;
    canvasElement: unknown;
  },
  Args
> = (Story, { args }) => {
  return (
    <TabBarContextProvider>
      <TabBarWrapper {...args}>
        <Story {...args} />
      </TabBarWrapper>
    </TabBarContextProvider>
  );
};
