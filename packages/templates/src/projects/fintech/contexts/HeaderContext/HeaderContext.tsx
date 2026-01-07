import { createContext, useRef, createRef } from 'react';
import { createPortal } from 'react-dom';
import { HeaderContextContent, HeaderContentRef } from './types';

export const HeaderContext = createContext<HeaderContextContent>({
  headerContentRef: createRef<HeaderContentRef>(),
  breadcrumbContentRef: createRef<HeaderContentRef>(),
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
