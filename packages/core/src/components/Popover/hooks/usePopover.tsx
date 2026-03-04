import * as React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useHover,
  safePolygon,
} from '@floating-ui/react';
import { PopoverOptions, UsePopover } from '../types';

/**
 * usePopover - Hook for popover functionality
 *
 * Custom hook that provides popover state management, positioning, and interactions.
 * Handles both controlled and uncontrolled modes, supports multiple interaction types
 * (click, hover, both), and integrates with Floating UI for positioning and focus management.
 *
 * @param options - Popover configuration options
 * @returns Popover context value with state, positioning, and interaction handlers
 *
 * @example
 * ```tsx
 * const popover = usePopover({
 *   placement: 'top',
 *   interactionsEnabled: 'click',
 *   modal: false,
 * });
 * ```
 *
 * @see {@link Popover} - Component that uses this hook
 */
export const usePopover: UsePopover = ({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  keyboardHandlers = true,
  floatingOptions = {},
  interactionsEnabled = 'click',
}: PopoverOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
    ...floatingOptions,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled:
      controlledOpen == null && ['click', 'both'].includes(interactionsEnabled),
    keyboardHandlers,
  });
  const isControlled = controlledOpen !== undefined;
  const dismiss = useDismiss(context, {
    // When controlled, disable referencePress (parent handles toggle) but keep outsidePress
    referencePress: !isControlled,
    // Keep outsidePress enabled even in controlled mode
    outsidePress: true,
    escapeKey: true,
    ancestorScroll: !isControlled,
  });
  const role = useRole(context);
  const hover = useHover(context, {
    enabled:
      controlledOpen == null && ['hover', 'both'].includes(interactionsEnabled),
    handleClose: safePolygon(),
  });

  const interactionsHooks = [dismiss, role];

  switch (interactionsEnabled) {
    case 'click': {
      interactionsHooks.push(click);
      break;
    }
    case 'hover': {
      interactionsHooks.push(hover);
      break;
    }
    default: {
      interactionsHooks.push(click, hover);
    }
  }

  const interactions = useInteractions(interactionsHooks);

  const result = React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      floatingOptions,
      setLabelId,
      setDescriptionId,
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      modal,
      labelId,
      descriptionId,
      floatingOptions,
    ],
  );

  return result;
};
