import { createContext, useState, useContext } from 'react';
import { AccordionTab, ITabBarContext } from './types';

export const AccordionContext = createContext<ITabBarContext>({
  activeTabs: [],
  toggleActiveTab() {
    /* default no-op */
  },
  setActiveTabs() {
    /* default no-op */
  },
});

export const useAccordionContext = () => useContext(AccordionContext);

const useTabBar = (initialTabs: Array<AccordionTab>): ITabBarContext => {
  const [activeTabs, setActiveTabs] = useState<AccordionTab[]>(
    initialTabs || [],
  );

  const toggleActiveTab = (tab: AccordionTab) => {
    const isActive = !!activeTabs.find(
      (activeTab) => activeTab.tabId === tab.tabId,
    );
    const newActiveTabs = isActive
      ? activeTabs.filter((activeTab) => activeTab.tabId !== tab.tabId)
      : activeTabs.concat([tab]);
    setActiveTabs(newActiveTabs);
  };

  return {
    activeTabs,
    setActiveTabs,
    toggleActiveTab,
  };
};

export const AccordionContextProvider = ({
  initialTabs = [],
  children,
}: {
  initialTabs?: AccordionTab[];
  children: React.ReactNode;
}) => {
  const { activeTabs, setActiveTabs, toggleActiveTab } = useTabBar(initialTabs);

  return (
    <AccordionContext.Provider
      value={{ activeTabs, setActiveTabs, toggleActiveTab }}>
      {children}
    </AccordionContext.Provider>
  );
};
