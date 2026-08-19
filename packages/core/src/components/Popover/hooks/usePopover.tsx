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
  arrow,
} from '@floating-ui/react';
import { isBorderedByDefault } from '@styles/floatingSurface';
import { useFloatingDisclosure } from '@utils/useFloatingDisclosure';
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
export const usePopover: UsePopover = (options: PopoverOptions = {}) => {
  const {
    placement = 'bottom',
    modal,
    keyboardHandlers = true,
    floatingOptions = {},
    interactionsEnabled = 'click',
    color,
    size,
    hasArrow = false,
    arrowProps = {},
    offsetOptions,
  } = options;

  // Both default off the color: an unstyled popover — the shape every popover
  // in the kit had before the surface props existed — keeps rendering exactly
  // as it did.
  const hasBorder = options.hasBorder ?? isBorderedByDefault(color);
  const hasShadow = options.hasShadow ?? Boolean(color);

  // Previously `setControlledOpen ?? setUncontrolledOpen`, which meant an
  // `onOpenChange` passed *without* `open` replaced the internal setter
  // entirely: the popover reported every intent and then never moved.
  const { open, setOpen, isControlled } = useFloatingDisclosure({
    component: 'Popover',
    props: options,
    aliases: { defaultAlias: 'initialOpen' },
  });

  const arrowRef = React.useRef<SVGSVGElement | null>(null);

  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      // An arrow needs to clear the trigger, so it widens the default gap.
      offset(offsetOptions ?? (hasArrow ? 12 : 5)),
      flip({
        crossAxis: placement.includes('-'),
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    ...floatingOptions,
  });

  const context = data.context;

  // A controlled popover leaves toggling to its parent, so the interactions
  // that would move it on their own stay off.
  const click = useClick(context, {
    enabled: !isControlled && ['click', 'both'].includes(interactionsEnabled),
    keyboardHandlers,
  });
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
    enabled: !isControlled && ['hover', 'both'].includes(interactionsEnabled),
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
      color,
      size,
      hasBorder,
      hasShadow,
      hasArrow,
      arrowProps,
      arrowRef,
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
      color,
      size,
      hasBorder,
      hasShadow,
      hasArrow,
      arrowProps,
      modal,
      labelId,
      descriptionId,
      floatingOptions,
    ],
  );

  return result;
};
