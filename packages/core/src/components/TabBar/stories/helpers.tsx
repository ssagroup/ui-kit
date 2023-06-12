import { Fragment } from 'react';
import { useTabBarContext, TabBarContextProvider } from '@components/TabBar';

export const TabBarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { activeTab } = useTabBarContext();
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
      <TabBarWrapper>
        <Story {...args} />
      </TabBarWrapper>
    </TabBarContextProvider>
  );
};
