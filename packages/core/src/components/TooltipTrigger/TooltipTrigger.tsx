import { cloneElement, isValidElement } from 'react';

import { TooltipTriggerProps } from '@components/Tooltip/types';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';

/**
 * TooltipTrigger - Trigger element for tooltip activation
 *
 * Wraps a single React element to make it trigger the tooltip. The wrapped
 * element receives tooltip interaction props (onMouseEnter, onMouseLeave, onClick, etc.)
 * and Floating UI reference props for positioning.
 *
 * Must be used within a Tooltip component and must have a single child element
 * (not a fragment or array). Returns null if children is not a valid element.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @see {@link Tooltip} - Parent component that provides context
 * @see {@link TooltipContent} - Content component that displays tooltip
 */
const TooltipTrigger = ({ children, className }: TooltipTriggerProps) => {
  const tooltipCtx = useTooltipContext();

  if (isValidElement<TooltipTriggerProps>(children)) {
    return cloneElement(
      children,
      tooltipCtx?.getReferenceProps({
        ref: tooltipCtx.refs.setReference,
        className: [children.props?.className, className]
          .filter(Boolean)
          .join(' '),
      }),
    );
  }

  return null;
};

export default TooltipTrigger;
