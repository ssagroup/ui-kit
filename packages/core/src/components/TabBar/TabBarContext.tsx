import { createContext, useState, useContext } from 'react';
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
  selectedTabId: undefined,
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
  selectedTabId = defaultTab.tabId,
  children,
}: {
  initialTab?: TabProps;
  selectedTabId?: TabProps['tabId'];
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<TabProps | undefined>(initialTab);
  const [activeTabId, setActiveTabId] = useState<TabProps['tabId'] | undefined>(
    initialTab.tabId,
  );

  return (
    <TabBarContext.Provider
      value={{
        activeTab,
        activeTabId,
        selectedTabId,
        setActiveTab,
        setActiveTabId,
      }}>
      {children}
    </TabBarContext.Provider>
  );
};
