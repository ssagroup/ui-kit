import { createContext, useState, useContext } from 'react';
import { Accordion, ITabBarContext } from './types';

export const AccordionGroupContext = createContext<ITabBarContext>(
  {} as ITabBarContext,
);

export const useAccordionGroupContext = () => useContext(AccordionGroupContext);

const useAccordionGroup = (initialTabs: Array<Accordion>): ITabBarContext => {
  const [activeTabs, setActiveTabs] = useState<Accordion[]>(initialTabs || []);

  const toggleActiveTab = (tab: Accordion) => {
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

export const AccordionGroupContextProvider = ({
  initialTabs = [],
  children,
}: {
  initialTabs?: Accordion[];
  children: React.ReactNode;
}) => {
  const { activeTabs, setActiveTabs, toggleActiveTab } =
    useAccordionGroup(initialTabs);

  return (
    <AccordionGroupContext.Provider
      value={{ activeTabs, setActiveTabs, toggleActiveTab }}>
      {children}
    </AccordionGroupContext.Provider>
  );
};
