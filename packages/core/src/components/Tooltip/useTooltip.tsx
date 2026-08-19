import { useMemo, useRef } from 'react';
import { useFloatingDisclosure } from '@utils/useFloatingDisclosure';
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
    color = 'grey',
    hasShadow = true,
    hasArrow = true,
    arrowProps = {},
    allowHoverContent = false,
    hoverOpenDelay = 0,
    hoverCloseDelay = 0,
  } = props || {};

  // The design only outlines the white surface, but the border is independent
  // of the color — any variant can opt in or out of it.
  const hasBorder = props?.hasBorder ?? color === 'white';

  // `isOpen` maps to `defaultOpen`, not `open`: despite the name it never
  // controlled the tooltip, it only ever seeded the initial state.
  const { open: isOpen, setOpen: setIsOpen } = useFloatingDisclosure({
    component: 'Tooltip',
    props: props || {},
    aliases: { defaultAlias: 'isOpen' },
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
      color,
      hasBorder,
      hasShadow,
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
      color,
      hasBorder,
      hasShadow,
      hasArrow,
      arrowProps,
      floatingData,
      interactionsData,
    ],
  );
};
