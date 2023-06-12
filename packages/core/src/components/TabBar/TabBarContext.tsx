import { createContext, useState, useContext } from 'react';
import { ITab, ITabBarContext } from './types';

const defaultTab: ITab = {
  tabId: Number.NaN,
  renderContent() {
    return null;
  },
};

export const TabBarContext = createContext<ITabBarContext>({
  activeTab: defaultTab,
  setActiveTab() {
    /* default no-op */
  },
});

export const useTabBarContext = () => useContext(TabBarContext);

const useTabBar = (initialTab?: ITab): ITabBarContext => {
  const [tab, setTab] = useState<ITab | undefined>(initialTab);

  return {
    activeTab: tab,
    setActiveTab: (tab) => setTab(tab),
  };
};

export const TabBarContextProvider = ({
  initialTab = defaultTab,
  children,
}: {
  initialTab?: ITab;
  children: React.ReactNode;
}) => {
  const { activeTab, setActiveTab } = useTabBar(initialTab);

  return (
    <TabBarContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabBarContext.Provider>
  );
};
