import styled from '@emotion/styled';
import { Children, cloneElement, isValidElement, useEffect } from 'react';
import { useTabBarContext } from './TabBarContext';
import { TabBarProps } from './types';

const TabBarBase = styled.div``;

/**
 * This component doesn't show contents of the selected tab,
 * however it accepts a required `renderContent()` render
 * prop and stores it into the Context. This lets the parent
 * component to decide where to render the contents of the
 * selected tab.
 * */
const TabBar = ({ children, className }: TabBarProps) => {
  const { activeTab, activeTabId, setActiveTab, setActiveTabId } =
    useTabBarContext();

  useEffect(() => {
    if (activeTabId && activeTab?.tabId !== activeTabId) {
      Children.forEach(children, (child) => {
        if (isValidElement(child) && child.props.tabId === activeTabId) {
          const { renderContent, ...rest } = child.props;
          setActiveTab({
            tabId: rest.tabId,
            renderContent: renderContent.bind(null, rest),
          });
        }
      });
    }
  }, [activeTabId]);

  return (
    <TabBarBase role="tablist" className={className}>
      {Children.map(children, (child) => {
        // istanbul ignore else
        if (isValidElement(child)) {
          return cloneElement(child, {
            key: child.props.tabId,
            isActive: activeTab?.tabId === child.props.tabId,
            onClick: () => setActiveTabId(child.props.tabId),
          });
        }
      })}
    </TabBarBase>
  );
};

export default TabBar;
