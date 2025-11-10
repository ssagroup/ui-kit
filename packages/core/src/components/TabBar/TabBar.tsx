import { Children, cloneElement, isValidElement, useEffect } from 'react';

import styled from '@emotion/styled';

import { useTabBarContext } from './TabBarContext';
import { TabBarProps, TabProps } from './types';

const TabBarBase = styled.div``;

/**
 * This component doesn't show contents of the selected tab,
 * however it accepts a required `renderContent()` render
 * prop and stores it into the Context. This lets the parent
 * component to decide where to render the contents of the
 * selected tab.
 * */
const TabBar = ({ children, className, ...rest }: TabBarProps) => {
  const { activeTab, selectedTabId, setActiveTab, setActiveTabId } =
    useTabBarContext();

  const setSelectedTabId = (tabId?: TabProps['tabId']) => {
    if (tabId && activeTab?.tabId !== tabId) {
      Children.forEach(children, (child) => {
        if (isValidElement(child) && child.props.tabId === tabId) {
          const { renderContent, ...rest } = child.props;
          setActiveTab({
            tabId: rest.tabId,
            renderContent: renderContent.bind(null, rest),
          });
        }
      });
    }
    setActiveTabId(tabId);
  };

  useEffect(() => {
    if (!Number.isNaN(selectedTabId) && activeTab?.tabId !== selectedTabId) {
      setSelectedTabId(selectedTabId);
    }
  }, [selectedTabId]);

  return (
    <TabBarBase role="tablist" className={className} {...rest}>
      {Children.map(children, (child) => {
        // istanbul ignore else
        if (isValidElement(child)) {
          const {
            tabId,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            renderContent,
            ariaControls,
            as,
            children,
            isActive,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ...htmlProps
          } = child.props;
          return cloneElement(child, {
            key: tabId,
            isActive: activeTab?.tabId === tabId,
            onClick: () => setSelectedTabId(tabId),
            ...htmlProps,
          });
        }
      })}
    </TabBarBase>
  );
};

export default TabBar;
