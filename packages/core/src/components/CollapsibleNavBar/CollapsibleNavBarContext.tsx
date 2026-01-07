import { createContext, useContext } from 'react';
import { CollapsibleNavBarExtendedProps } from './types';

type ContextType = Pick<
  CollapsibleNavBarExtendedProps,
  'theme' | 'subMenuMaxWidth' | 'showIconTooltip' | 'exactMatch'
>;

export const CollapsibleNavBarContext = createContext<ContextType>({
  theme: 'default',
  exactMatch: false,
});

export const CollapsibleNavBarProvider = ({
  children,
  theme,
  subMenuMaxWidth,
  showIconTooltip,
  exactMatch,
}: {
  children: React.ReactNode;
} & ContextType) => (
  <CollapsibleNavBarContext.Provider
    value={{
      theme,
      subMenuMaxWidth,
      showIconTooltip,
      exactMatch: exactMatch ?? false,
    }}>
    {children}
  </CollapsibleNavBarContext.Provider>
);

export const useCollapsibleNavBarContext = () => {
  return useContext(CollapsibleNavBarContext);
};
