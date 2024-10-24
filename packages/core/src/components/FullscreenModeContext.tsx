import { createContext, useContext, useState } from 'react';

export type FullscreenModeContextType = {
  isFullscreenMode: boolean;
  toggleFullscreenMode: () => void;
  setFullscreenMode: (isFullscreenMode: boolean) => void;
};

export const FullscreenModeContext = createContext<FullscreenModeContextType>({
  isFullscreenMode: false,
  toggleFullscreenMode: () => {
    // no-op
  },
  setFullscreenMode: () => {
    // no-op
  },
});

export const FullscreenModeProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const toggleFullscreenMode = () => {
    setFullscreenMode((prevState) => !prevState);
  };
  return (
    <FullscreenModeContext.Provider
      value={{ isFullscreenMode, setFullscreenMode, toggleFullscreenMode }}>
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
