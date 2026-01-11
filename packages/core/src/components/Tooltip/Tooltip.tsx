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
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Basic tooltip on hover
 * <Tooltip>
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
 * <Tooltip placement="bottom" size="large">
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
 * // Click-to-open tooltip
 * <Tooltip enableClick enableHover={false}>
 *   <TooltipTrigger>
 *     <Button>Click for info</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Information that appears on click</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip without arrow
 * <Tooltip hasArrow={false}>
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
