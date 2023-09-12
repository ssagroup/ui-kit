import styled from '@emotion/styled';
import { Children, cloneElement, isValidElement } from 'react';
import { useTabBarContext } from './TabBarContext';
import { ITabBarProps } from './types';

const TabBarBase = styled.div``;

/**
 * This component doesn't show contents of the selected tab,
 * however it accepts a required `renderContent()` render
 * prop and stores it into the Context. This lets the parent
 * component to decide where to render the contents of the
 * selected tab.
 * */
const TabBar = ({ children }: ITabBarProps) => {
  const { activeTab, setActiveTab } = useTabBarContext();
  const activeTabId = activeTab?.tabId;

  return (
    <TabBarBase role="tablist">
      {Children.map(children, (child) => {
        // istanbul ignore else
        if (isValidElement(child)) {
          const { renderContent, ...rest } = child.props;
          const tabId = rest.tabId;

          return cloneElement(child, {
            key: tabId,
            isActive: activeTabId === tabId,
            onClick: () =>
              activeTabId !== tabId &&
              setActiveTab({
                tabId,
                renderContent: renderContent.bind(null, rest),
              }),
          });
        }
      })}
    </TabBarBase>
  );
};

export default TabBar;
