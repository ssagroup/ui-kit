import { createContext, useState } from 'react';
import { AppLayoutContextType } from './types';

export const AppLayoutContext = createContext<AppLayoutContextType>({
  isFullscreenMode: false,
  isNavBarOpened: false,
  mainRef: null,
  setFullscreenMode: () => {
    // no-op
  },
  setNavBarOpened: () => {
    // no-op
  },
});

export const AppLayoutProvider = ({
  children,
  mainRef,
}: React.PropsWithChildren<Pick<AppLayoutContextType, 'mainRef'>>) => {
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const [isNavBarOpened, setNavBarOpened] = useState(false);
  return (
    <AppLayoutContext.Provider
      value={{
        isNavBarOpened,
        mainRef,
        isFullscreenMode,
        setFullscreenMode,
        setNavBarOpened,
      }}>
      {children}
    </AppLayoutContext.Provider>
  );
};
