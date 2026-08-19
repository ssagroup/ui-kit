import { useCallbackRef, useControllableState } from '@ssa-ui-kit/hooks';
import {
  DeprecatedOpenStateProps,
  OpenStateProps,
  resolveOpenState,
} from './deprecation';

interface UseFloatingDisclosureArgs {
  /** Component name, used for the deprecation warnings. */
  component: string;
  props: OpenStateProps & DeprecatedOpenStateProps;
  aliases?: Parameters<typeof resolveOpenState>[2];
}

interface FloatingDisclosure {
  open: boolean;
  /** Stable across renders, so a memoised context value stays stable too. */
  setOpen: (action: React.SetStateAction<boolean>) => void;
  /** Whether the parent drives the open state through `open`/`onOpenChange`. */
  isControlled: boolean;
}

/**
 * Open-state plumbing shared by the kit's floating components (Tooltip,
 * Popover): resolves the deprecated prop spellings, wires the controlled /
 * uncontrolled split through `useControllableState`, and hands back a setter
 * with a stable identity.
 *
 * Everything above it — positioning middleware, which interactions are enabled,
 * focus management — stays with each component, because that is where they
 * genuinely differ.
 */
export const useFloatingDisclosure = ({
  component,
  props,
  aliases,
}: UseFloatingDisclosureArgs): FloatingDisclosure => {
  const openState = resolveOpenState(component, props, aliases);

  const [openValue, setOpenValue] = useControllableState<boolean>({
    controlled: openState.isControlled,
    value: openState.open,
    defaultValue: openState.defaultOpen,
    finalValue: false,
    onChange: openState.onOpenChange,
  });
  const open = Boolean(openValue);

  // Reads `open` through the ref, so the functional `setOpen(prev => …)` form
  // still sees the current value.
  const setOpen = useCallbackRef((action: React.SetStateAction<boolean>) => {
    setOpenValue(typeof action === 'function' ? action(open) : action);
  });

  return { open, setOpen, isControlled: openState.isControlled };
};
