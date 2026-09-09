import { useTooltip } from './useTooltip';
import { TooltipContext } from './useTooltipContext';
import { TooltipProps } from './types';

/**
 * Tooltip - Contextual information component
 *
 * A flexible tooltip system built on Floating UI that provides contextual
 * information when users interact with trigger elements. Uses a compound
 * component pattern with Tooltip (root), TooltipTrigger (activator), and
 * TooltipContent (display).
 *
 * Supports multiple interaction modes (hover, click, follow cursor), flexible
 * positioning with auto-adjustment, and customizable appearance with size
 * variants and optional arrows.
 *
 * Note that the tooltip opens on **click** by default. For the usual hover
 * behaviour pass `enableHover enableClick={false}`, as every example below and
 * every call site in the kit does.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Basic tooltip on hover
 * <Tooltip enableHover enableClick={false}>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>This is helpful information</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip with custom placement
 * <Tooltip enableHover enableClick={false} placement="bottom" size="large">
 *   <TooltipTrigger>
 *     <Icon name="info" />
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <div>
 *       <strong>Detailed Information</strong>
 *       <p>This is a larger tooltip with more content</p>
 *     </div>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Click-to-open tooltip — this is the default interaction
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Click for info</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Information that appears on click</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Dark surface, no shadow
 * <Tooltip enableHover enableClick={false} color="dark" hasShadow={false}>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent title="Headline" maxWidth={200}>
 *     Body text that wraps at 200px
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip without arrow
 * <Tooltip enableHover enableClick={false} hasArrow={false}>
 *   <TooltipTrigger>
 *     <span>?</span>
 *   </TooltipTrigger>
 *   <TooltipContent>No arrow tooltip</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @see {@link TooltipTrigger} - Trigger element component
 * @see {@link TooltipContent} - Content display component
 *
 * @accessibility
 * - Keyboard accessible (ESC to close)
 * - Focus management for click-triggered tooltips
 * - ARIA attributes automatically applied
 * - Screen reader friendly
 */
const Tooltip = ({ children, ...props }: TooltipProps) => {
  const tooltip = useTooltip(props);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};
export default Tooltip;
