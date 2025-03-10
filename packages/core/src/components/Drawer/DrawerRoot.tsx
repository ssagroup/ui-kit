import { DrawerProvider } from './DrawerProvider';
import { useDrawer, UseDrawerStore } from './useDrawer';

export interface DrawerProps {
  children: React.ReactElement;
  store?: UseDrawerStore;
}

export const Drawer = ({ children, store: controlledStore }: DrawerProps) => {
  const uncontrolledStore = useDrawer({});
  const store = controlledStore || uncontrolledStore;

  if (!store.transition.isMounted) {
    return null;
  }

  return <DrawerProvider value={{ store }}>{children}</DrawerProvider>;
};
