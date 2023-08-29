import { Fragment, useLayoutEffect } from 'react';
import { useTabBarContext, TabBarContextProvider } from '@components/TabBar';
import { ITab } from '../types';

export const TabBarWrapper = ({
  children,
  selectedTabId,
  renderContent,
}: {
  children: React.ReactNode;
  selectedTabId?: ITab['tabId'];
  renderContent?: ITab['renderContent'];
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
  id: string;
  labelledBy: string;
}) => {
  return (
    <p id={id} role="tabpanel" tabIndex={0} aria-labelledby={labelledBy}>
      {text}
    </p>
  );
};

/* istanbul ignore next */
export const TabBarDecorator = (Story, { args }) => {
  return (
    <TabBarContextProvider>
      <TabBarWrapper {...args}>
        <Story {...args} />
      </TabBarWrapper>
    </TabBarContextProvider>
  );
};
