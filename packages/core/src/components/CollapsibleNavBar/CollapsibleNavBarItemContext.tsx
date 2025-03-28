import { createContext, useContext } from 'react';

type ContextType = {
  isActive: boolean;
  isHover: boolean;
};

export const CollapsibleNavBarItemContext = createContext<ContextType>({
  isActive: false,
  isHover: false,
});

export const CollapsibleNavBarItemProvider = ({
  children,
  isActive,
  isHover,
}: {
  children: React.ReactNode;
} & ContextType) => (
  <CollapsibleNavBarItemContext.Provider
    value={{
      isActive,
      isHover,
    }}>
    {children}
  </CollapsibleNavBarItemContext.Provider>
);

export const useCollapsibleNavBarItemContext = () => {
  return useContext(CollapsibleNavBarItemContext);
};
