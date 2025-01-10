import { createContext, useRef, createRef } from 'react';
import { createPortal } from 'react-dom';
import { HeaderContextContent, HeaderContentRef } from './types';

export const HeaderContext = createContext<HeaderContextContent>({
  headerContentRef: createRef(),
  renderHeaderContent() {
    return null;
  },
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const headerContentRef = useRef<HeaderContentRef>(null);

  const renderHeaderContent = (content: React.ReactNode) => {
    if (headerContentRef.current == null) {
      return null;
    }
    return createPortal(content, headerContentRef.current);
  };

  return (
    <HeaderContext.Provider
      value={{
        headerContentRef,
        renderHeaderContent,
      }}>
      {children}
    </HeaderContext.Provider>
  );
};
