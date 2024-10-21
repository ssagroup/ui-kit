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
