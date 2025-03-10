import { useEffect } from 'react';
import { FloatingPortal, useFloatingPortalNode } from '@floating-ui/react';

import { useDrawerContext } from './DrawerProvider';

export const DrawerPortal = ({
  children,
  ...props
}: React.ComponentProps<typeof FloatingPortal>) => {
  const ctx = useDrawerContext();
  const portalNode = useFloatingPortalNode();

  useEffect(() => {
    ctx.store.setPortalNode(portalNode);
    return () => ctx.store.setPortalNode(null);
  }, [portalNode]);

  return (
    <FloatingPortal root={portalNode} {...props}>
      {children}
    </FloatingPortal>
  );
};
