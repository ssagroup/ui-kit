import { DrawerProvider } from './DrawerProvider';
import { useDrawer, UseDrawerStore, UseDrawerOptions } from './useDrawer';

export interface DrawerProps extends UseDrawerOptions {
  children?: React.ReactElement;
  store?: UseDrawerStore;
}

/**
 * Drawer.Root - Slide-out panel anchored to an edge of the screen.
 *
 * Exported as a namespace, so the parts are reached through it:
 * `import { Drawer } from '@ssa-ui-kit/core'` then `<Drawer.Root>`. There is no
 * bare `<Drawer>` component.
 *
 * ### Nesting is required
 * ```
 * Drawer.Root                 — owns the state
 * └── Drawer.Portal           — renders outside the DOM subtree
 *     └── Drawer.Overlay      — backdrop; click-outside to dismiss
 *         └── Drawer.Content  — the panel itself
 *             ├── Drawer.Header
 *             │   ├── Drawer.Title
 *             │   └── Drawer.CloseButton
 *             └── …your content
 * ```
 * Each layer reads context from the one above, so skipping a level (Content
 * without Overlay, say) leaves the drawer without its backdrop and dismiss
 * behaviour.
 *
 * ### Controlled via the `useDrawer` store
 * For a drawer opened from elsewhere — a toolbar button, a route — call
 * `useDrawer()` in the parent and hand the result to `store`. That same object
 * carries `interactions.getReferenceProps()` for wiring the trigger. Omit
 * `store` and `Drawer.Root` keeps its own state from `defaultOpen`.
 *
 * ### It unmounts while closed
 * `Drawer.Root` renders `null` until the open transition starts, so children do
 * not exist in the DOM when the drawer is shut. Anything that must keep state
 * across open/close belongs above the drawer, not inside it.
 *
 * Note `opened`/`defaultOpened` are the legacy spelling of `open`/`defaultOpen`;
 * prefer the latter.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Controlled: the trigger lives outside the drawer
 * const drawer = useDrawer({ title: 'Settings', withCloseButton: true });
 *
 * <>
 *   <Button {...drawer.interactions.getReferenceProps()} text="Settings" />
 *   <Drawer.Root store={drawer}>
 *     <Drawer.Portal>
 *       <Drawer.Overlay>
 *         <Drawer.Content css={{ maxWidth: 400, padding: 24 }}>
 *           {form}
 *         </Drawer.Content>
 *       </Drawer.Overlay>
 *     </Drawer.Portal>
 *   </Drawer.Root>
 * </>
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled, anchored left, not dismissable by click-outside
 * <Drawer.Root defaultOpen position="left" dismissable={false}>
 *   <Drawer.Portal>
 *     <Drawer.Overlay>
 *       <Drawer.Content>{content}</Drawer.Content>
 *     </Drawer.Overlay>
 *   </Drawer.Portal>
 * </Drawer.Root>
 * ```
 */
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
