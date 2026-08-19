import { forwardRef } from 'react';
import {
  FloatingPortal,
  FloatingFocusManager,
  useMergeRefs,
} from '@floating-ui/react';

import { TooltipArrow } from '@components/Tooltip/TooltipArrow';
import { TooltipContentBase } from '@components/Tooltip/TooltipContentBase';
import { TooltipContentProps, TooltipSize } from '@components/Tooltip/types';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { mapSizes } from '@components/Tooltip/utils';
import * as styles from '@components/Tooltip/styles';

/**
 * TooltipContent - Content container for tooltip display
 *
 * Renders the actual tooltip content that appears when the trigger is activated.
 * Uses Floating Portal for proper z-index stacking and FloatingFocusManager for
 * keyboard accessibility. Automatically positions based on Floating UI context
 * and respects size variants and arrow configuration.
 *
 * Only renders when tooltip is open (isOpen is true). Supports custom styling
 * and can contain any React content.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Info</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     This is the tooltip content
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip with custom styling
 * <TooltipContent style={{ padding: 16, maxWidth: 300 }}>
 *   <div>
 *     <strong>Title</strong>
 *     <p>Detailed description here</p>
 *   </div>
 * </TooltipContent>
 * ```
 *
 * @example
 * ```tsx
 * // Headline above the body text, wrapping at 200px
 * <TooltipContent title="Headline" maxWidth={200}>
 *   A short description that wraps onto several lines.
 * </TooltipContent>
 * ```
 *
 * @see {@link Tooltip} - Parent component that provides context
 * @see {@link TooltipTrigger} - Trigger component that activates tooltip
 *
 * @accessibility
 * - Renders in FloatingPortal for proper stacking
 * - Uses FloatingFocusManager for keyboard navigation
 * - Only visible when isOpen is true
 */
const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    { children, title, maxWidth, className, style },
    refProp,
  ) {
    const tooltipCtx = useTooltipContext();
    const ref = useMergeRefs([tooltipCtx?.refs.setFloating, refProp]);

    return (
      <FloatingPortal>
        {tooltipCtx?.isOpen && (
          <FloatingFocusManager context={tooltipCtx.context} modal={false}>
            <TooltipContentBase
              tooltipColor={tooltipCtx.color}
              hasBorder={tooltipCtx.hasBorder}
              hasShadow={tooltipCtx.hasShadow}
              {...tooltipCtx.getFloatingProps({
                ref,
                css: [
                  tooltipCtx.size && mapSizes[tooltipCtx.size as TooltipSize],
                  title != null && styles.withTitle,
                ],
                className,
                style: {
                  position: tooltipCtx.strategy,
                  top: tooltipCtx.y ?? 0,
                  left: tooltipCtx.x ?? 0,
                  width: 'max-content',
                  ...(maxWidth === undefined
                    ? {}
                    : { maxWidth, overflowWrap: 'break-word' }),
                  ...style,
                },
              })}>
              {tooltipCtx.hasArrow && (
                <TooltipArrow {...tooltipCtx.arrowProps} />
              )}
              {title != null && <div css={styles.title}>{title}</div>}
              {children}
            </TooltipContentBase>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    );
  },
);

export default TooltipContent;
