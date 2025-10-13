import { createContext, createRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import { HeaderContentRef, HeaderContextContent } from './types';

export const HeaderContext = createContext<HeaderContextContent>({
  headerContentRef: createRef(),
  breadcrumbContentRef: createRef(),
  renderHeaderContent() {
    return null;
  },
  renderBreadcrumbContent() {
    return null;
  },
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const headerContentRef = useRef<HeaderContentRef>(null);
  const breadcrumbContentRef = useRef<HeaderContentRef>(null);

  const renderHeaderContent = (content: React.ReactNode) => {
    if (headerContentRef.current == null) {
      return null;
    }
    return createPortal(content, headerContentRef.current);
  };

  const renderBreadcrumbContent = (content: React.ReactNode) => {
    if (breadcrumbContentRef.current == null) {
      return null;
    }
    return createPortal(content, breadcrumbContentRef.current);
  };

  return (
    <HeaderContext.Provider
      value={{
        headerContentRef,
        breadcrumbContentRef,
        renderHeaderContent,
        renderBreadcrumbContent,
      }}>
      {children}
    </HeaderContext.Provider>
  );
};
