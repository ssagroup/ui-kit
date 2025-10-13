import { createContext, useState } from 'react';

import { AppLayoutContextType } from './types';

export const AppLayoutContext = createContext<AppLayoutContextType>({
  isNavBarOpened: false,
  isFullscreenMode: false,
  mainRef: null,
  setFullscreenMode: () => {
    // no-op
  },
});

export const AppLayoutProvider = ({
  children,
  isNavBarOpened,
  mainRef,
}: React.PropsWithChildren<
  Pick<AppLayoutContextType, 'isNavBarOpened' | 'mainRef'>
>) => {
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  return (
    <AppLayoutContext.Provider
      value={{ isNavBarOpened, mainRef, isFullscreenMode, setFullscreenMode }}>
      {children}
    </AppLayoutContext.Provider>
  );
};
