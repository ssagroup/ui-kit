import {
  OpenChangeReason,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import { useState } from 'react';
import { resolveOpenState } from '@utils/deprecation';

export type Position = 'left' | 'right' | 'top' | 'bottom';

export type UseDrawerOptions = {
  /**
   * Controlled open state. When provided, the drawer is fully controlled and
   * the parent must update it from `onOpenChange`.
   */
  open?: boolean;
  /** Initial open state for an uncontrolled drawer. */
  defaultOpen?: boolean;
  /**
   * Controlled open state.
   *
   * @deprecated Use `open` instead — `opened` is removed in the next major
   * release.
   */
  opened?: boolean;
  /**
   * Initial open state for an uncontrolled drawer.
   *
   * @deprecated Use `defaultOpen` instead — `defaultOpened` is removed in the
   * next major release.
   */
  defaultOpened?: boolean;
  duration?: number;
  dismissable?: boolean;
  position?: Position;
  title?: string;
  withCloseButton?: boolean;
  onOpenChange?: (
    open: boolean,
    event?: Event,
    reason?: OpenChangeReason,
  ) => void;
};

export const useDrawer = (options: UseDrawerOptions = {}) => {
  const {
    duration = 200,
    dismissable = false,
    position = 'left',
    title,
    withCloseButton = false,
  } = options;

  const openState = resolveOpenState('Drawer', options, {
    controlledAlias: 'opened',
    defaultAlias: 'defaultOpened',
  });

  const [openValue, setOpen] = useControllableState<boolean>({
    controlled: openState.isControlled,
    value: openState.open,
    defaultValue: openState.defaultOpen,
    finalValue: false,
    onChange: openState.onOpenChange,
  });
  const _open = Boolean(openValue);

  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  const toggle = (nextOpen?: boolean) => {
    setOpen(nextOpen ?? !_open);
  };

  const { context, refs } = useFloating({
    open: _open,
    onOpenChange: setOpen,
  });

  const transition = useTransitionStatus(context, {
    duration,
  });

  const dismiss = useDismiss(context, {
    enabled: dismissable,
  });
  const click = useClick(context);

  const interactions = useInteractions([dismiss, click]);

  return {
    open: _open,
    /**
     * @deprecated Read `open` instead — the `opened` key is removed from the
     * store in the next major release.
     */
    opened: _open,
    dismissable,
    position,
    duration,
    floatingContext: context,
    interactions,
    transition,
    title,
    withCloseButton,
    portalNode,
    setFloating: refs.setFloating,
    setPortalNode,
    toggle,
  };
};

export type UseDrawerStore = ReturnType<typeof useDrawer>;
