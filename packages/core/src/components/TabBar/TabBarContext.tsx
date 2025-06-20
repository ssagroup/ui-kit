import { createContext, useState, useContext, useEffect } from 'react';
import { TabProps, TabBarContextProps } from './types';

const defaultTab: TabProps = {
  tabId: Number.NaN,
  renderContent() {
    return null;
  },
};

export const TabBarContext = createContext<TabBarContextProps>({
  activeTab: defaultTab,
  activeTabId: undefined,
  setActiveTab() {
    /* default no-op */
  },
  setActiveTabId() {
    /* default no-op */
  },
});

export const useTabBarContext = () => useContext(TabBarContext);

export const TabBarContextProvider = ({
  initialTab = defaultTab,
  initialTabId = defaultTab.tabId,
  children,
}: {
  initialTab?: TabProps;
  initialTabId?: TabProps['tabId'];
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<TabProps | undefined>(initialTab);
  const [activeTabId, setActiveTabId] = useState<TabProps['tabId'] | undefined>(
    initialTab.tabId,
  );

  useEffect(() => {
    if (!Number.isNaN(initialTabId) && activeTab?.tabId !== initialTabId) {
      setActiveTabId(initialTabId);
    }
  }, [initialTabId]);

  return (
    <TabBarContext.Provider
      value={{ activeTab, activeTabId, setActiveTab, setActiveTabId }}>
      {children}
    </TabBarContext.Provider>
  );
};
