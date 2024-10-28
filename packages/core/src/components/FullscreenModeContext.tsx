import { createContext, useContext, useState } from 'react';

export type FullscreenModeContextType = {
  isFullscreenMode: boolean;
  activeId: null | number | string;
  toggleFullscreenMode: () => void;
  setFullscreenMode: (isFullscreenMode: boolean) => void;
  setActiveId: (activeId: null | number | string) => void;
};

export const FullscreenModeContext = createContext<FullscreenModeContextType>({
  isFullscreenMode: false,
  activeId: null,
  toggleFullscreenMode: () => {
    // no-op
  },
  setFullscreenMode: () => {
    // no-op
  },
  setActiveId: () => {
    // no-op
  },
});

export const FullscreenModeProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const [activeId, setActiveId] =
    useState<FullscreenModeContextType['activeId']>(null);
  const toggleFullscreenMode = () => {
    setFullscreenMode((prevState) => !prevState);
  };
  return (
    <FullscreenModeContext.Provider
      value={{
        isFullscreenMode,
        activeId,
        setFullscreenMode,
        toggleFullscreenMode,
        setActiveId,
      }}>
      {children}
    </FullscreenModeContext.Provider>
  );
};

export const useFullscreenMode = () => useContext(FullscreenModeContext);

export const WithFullscreenMode = <T extends object>(
  Component: React.ComponentType<T>,
  rest?: Parameters<typeof FullscreenModeProvider>[0],
) => {
  const decoratedComp = (props: T) => (
    <FullscreenModeProvider {...rest}>
      <Component {...props} />
    </FullscreenModeProvider>
  );

  decoratedComp.displayName = `WithFullscreenMode(${Component.displayName})`;
  return decoratedComp;
};
