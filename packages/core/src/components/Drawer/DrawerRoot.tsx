import { DrawerProvider } from './DrawerProvider';
import { useDrawer, UseDrawerOptions, UseDrawerStore } from './useDrawer';

export interface DrawerProps extends UseDrawerOptions {
  children?: React.ReactElement;
  store?: UseDrawerStore;
}

export const Drawer = ({
  children,
  store: controlledStore,
  ...drawerProps
}: DrawerProps) => {
  const uncontrolledStore = useDrawer(drawerProps);
  const store = controlledStore || uncontrolledStore;

  if (!store.transition.isMounted) {
    return null;
  }

  return <DrawerProvider value={{ store }}>{children}</DrawerProvider>;
};
