import { createContext, useContext } from 'react';
import { CollapsibleNavBarExtendedProps } from './types';

type ContextType = Pick<
  CollapsibleNavBarExtendedProps,
  'theme' | 'subMenuMaxWidth'
>;

export const CollapsibleNavBarContext = createContext<ContextType>({
  theme: 'default',
});

export const CollapsibleNavBarProvider = ({
  children,
  theme,
  subMenuMaxWidth,
}: {
  children: React.ReactNode;
} & ContextType) => (
  <CollapsibleNavBarContext.Provider
    value={{
      theme,
      subMenuMaxWidth,
    }}>
    {children}
  </CollapsibleNavBarContext.Provider>
);

export const useCollapsibleNavBarContext = () => {
  return useContext(CollapsibleNavBarContext);
};
