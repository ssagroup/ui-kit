import { useMemo, useRef } from 'react';
import { useCallbackRef, useControllableState } from '@ssa-ui-kit/hooks';
import { resolveOpenState } from '@utils/deprecation';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  useHover,
  useClick,
  useDismiss,
  useRole,
  useClientPoint,
  useInteractions,
  safePolygon,
} from '@floating-ui/react';
import { UseTooltip } from './types';

export const useTooltip: UseTooltip = (props) => {
  const {
    placement,
    enableClick = true,
    enableHover = false,
    enableClientPoint = false,
    offsetOptions = 12,
    size = 'small',
    hasArrow = true,
    arrowProps = {},
    allowHoverContent = false,
    hoverOpenDelay = 0,
    hoverCloseDelay = 0,
  } = props || {};

  // `isOpen` maps to `defaultOpen`, not `open`: despite the name it never
  // controlled the tooltip, it only ever seeded the initial state.
  const openState = resolveOpenState('Tooltip', props || {}, {
    defaultAlias: 'isOpen',
  });

  const [openValue, setOpen] = useControllableState<boolean>({
    controlled: openState.isControlled,
    value: openState.open,
    defaultValue: openState.defaultOpen,
    finalValue: false,
    onChange: openState.onOpenChange,
  });
  const isOpen = Boolean(openValue);

  // Stable identity, so the memoised context value below does not change on
  // every render. Reads `isOpen` through the ref, so the functional
  // `setIsOpen(prev => …)` form still sees the current value.
  const setIsOpen = useCallbackRef((action: React.SetStateAction<boolean>) => {
    setOpen(typeof action === 'function' ? action(isOpen) : action);
  });
  const arrowRef = useRef(null);

  const floatingData = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(offsetOptions),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { context } = floatingData;

  const delayConfig = useMemo(() => {
    if (hoverOpenDelay > 0 || hoverCloseDelay > 0) {
      return {
        open: hoverOpenDelay,
        close: hoverCloseDelay,
      };
    }
    return undefined;
  }, [hoverOpenDelay, hoverCloseDelay]);

  const hover = useHover(context, {
    enabled: enableHover,
    move: true,
    handleClose: allowHoverContent ? safePolygon() : undefined,
    delay: delayConfig,
  });
  const click = useClick(context, { enabled: enableClick });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const clientPoint = useClientPoint(context, { enabled: enableClientPoint });

  const interactionsData = useInteractions([
    hover,
    click,
    dismiss,
    role,
    clientPoint,
  ]);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      arrowRef,
      size,
      hasArrow,
      arrowProps,
      ...floatingData,
      ...interactionsData,
    }),
    [
      isOpen,
      setIsOpen,
      arrowRef,
      size,
      hasArrow,
      arrowProps,
      floatingData,
      interactionsData,
    ],
  );
};
