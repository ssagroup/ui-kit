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
  setActiveTab() {
    /* default no-op */
  },
});

export const useTabBarContext = () => useContext(TabBarContext);

const useTabBar = (initialTab?: TabProps): TabBarContextProps => {
  const [tab, setTab] = useState<TabProps | undefined>(initialTab);

  return {
    activeTab: tab,
    setActiveTab: (tab) => setTab(tab),
  };
};

export const TabBarContextProvider = ({
  initialTab = defaultTab,
  children,
}: {
  initialTab?: TabProps;
  children: React.ReactNode;
}) => {
  const { activeTab, setActiveTab } = useTabBar(initialTab);

  return (
    <TabBarContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabBarContext.Provider>
  );
};
