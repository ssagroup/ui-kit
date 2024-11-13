import { useState, useMemo, useRef } from 'react';
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
  useInteractions,
} from '@floating-ui/react';
import { UseTooltip } from './types';

export const useTooltip: UseTooltip = ({
  placement,
  enableClick = true,
  enableHover = false,
  offsetOptions = 12,
  size = 'small',
  hasArrow = true,
  arrowProps = {},
  isOpen: isInitOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
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

  const hover = useHover(context, { enabled: enableHover, move: true });
  const click = useClick(context, { enabled: enableClick });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactionsData = useInteractions([hover, click, dismiss, role]);

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
