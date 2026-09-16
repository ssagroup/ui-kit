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
import { resolveOpenState, warnDeprecatedProp } from '@utils/deprecation';

export type Position = 'left' | 'right' | 'top' | 'bottom';

/**
 * Both side drawers are this wide. The design file shows 400 on the left and
 * 572 on the right, but that difference is a file-level inconsistency rather
 * than intent — the two are the same panel mirrored.
 */
const DEFAULT_WIDTH = 400;

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
  /**
   * Title for the header that `Drawer.Content` builds for you.
   *
   * @deprecated Compose the header instead — `Drawer.Header` with a
   * `Drawer.Title` inside. The store-built header cannot hold anything else,
   * so a drawer that needs a save button or a search field has to abandon it
   * entirely. Removed in the next major release.
   */
  title?: string;
  /**
   * Adds a close button to the header that `Drawer.Content` builds for you.
   *
   * @deprecated Render `Drawer.CloseButton` yourself, inside a `Drawer.Header`
   * — usually within a `Drawer.Actions` group. Removed in the next major
   * release.
   */
  withCloseButton?: boolean;
  /**
   * Width of the panel for `left`/`right` drawers — a number of px, or any CSS
   * length. `top`/`bottom` drawers span the full width and ignore it.
   *
   * @default 400
   */
  width?: number | string;
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
    width = DEFAULT_WIDTH,
  } = options;

  // Checked against the raw options rather than the destructured values: the
  // defaults above would otherwise make every drawer look like it opted in.
  if (options.title !== undefined) {
    warnDeprecatedProp('Drawer', 'title', 'Drawer.Title');
  }
  if (options.withCloseButton !== undefined) {
    warnDeprecatedProp('Drawer', 'withCloseButton', 'Drawer.CloseButton');
  }

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
    width,
    portalNode,
    setFloating: refs.setFloating,
    setPortalNode,
    toggle,
  };
};

export type UseDrawerStore = ReturnType<typeof useDrawer>;
