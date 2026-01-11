import {
  useInteractions,
  FloatingArrow,
  Placement,
  UseFloatingReturn,
  OffsetOptions,
} from '@floating-ui/react';
import { PointTooltipProps, Point, LineSeries } from '@nivo/line';
import { MapIconsType } from '@components/Icon/types';
import { ProgressBarProps } from '@components/ProgressBar/types';
import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';

/**
 * Size variant for tooltip content
 * - `small`: Compact tooltip with minimal padding
 * - `medium`: Standard tooltip size (default)
 * - `large`: Larger tooltip for more content
 */
export type TooltipSize = 'small' | 'medium' | 'large';

/**
 * Props for the Tooltip component
 *
 * Root container component for tooltip system using compound component pattern.
 * Provides context and positioning configuration for TooltipTrigger and TooltipContent.
 * Built on Floating UI for flexible positioning and interaction modes.
 *
 * @example
 * ```tsx
 * <Tooltip placement="top">
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>This is a tooltip</TooltipContent>
 * </Tooltip>
 * ```
 */
export interface TooltipProps extends CommonProps {
  /**
   * TooltipTrigger and TooltipContent components
   * Must include both TooltipTrigger and TooltipContent as children
   */
  children: React.ReactNode;

  /**
   * Preferred placement of the tooltip relative to trigger
   * Floating UI will auto-adjust if space is insufficient
   */
  placement?: Placement;

  /**
   * Enable tooltip on hover interaction
   * @default true
   */
  enableHover?: boolean;

  /**
   * Enable tooltip on click interaction
   * @default false
   */
  enableClick?: boolean;

  /**
   * Enable tooltip to follow client point (mouse position)
   * Useful for interactive tooltips like charts
   * @default false
   */
  enableClientPoint?: boolean;

  /**
   * Offset configuration for tooltip positioning
   * Allows fine-tuning of spacing from trigger element
   */
  offsetOptions?: OffsetOptions;

  /**
   * Allow hovering over tooltip content itself
   * When true, tooltip stays open when hovering over content
   * @default false
   */
  allowHoverContent?: boolean;

  /**
   * Size variant of the tooltip content
   * @default 'medium'
   */
  size?: TooltipSize;

  /**
   * Whether to display arrow pointing to trigger
   * @default true
   */
  hasArrow?: boolean;

  /**
   * Additional props for the arrow element
   */
  arrowProps?: TooltipArrowProps;

  /**
   * Controlled open state
   * When provided, controls tooltip visibility externally
   */
  isOpen?: boolean;
}

export type UseTooltipArgs = Omit<TooltipProps, 'children'>;

type UseInteractions = ReturnType<typeof useInteractions>;

interface RefObject<T> {
  current: T;
}

export type UseTooltip = (props?: UseTooltipArgs) => Pick<
  TooltipProps,
  'size' | 'hasArrow' | 'arrowProps'
> & {
  arrowRef: RefObject<null>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & UseFloatingReturn &
  UseInteractions;

export type TooltipContextType =
  | (UseFloatingReturn &
      ReturnType<typeof useInteractions> & {
        arrowRef: React.Ref<SVGSVGElement>;
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
      } & Pick<TooltipProps, 'size' | 'hasArrow' | 'arrowProps'>)
  | null;

export type TooltipArrowProps = Omit<
  React.ComponentProps<typeof FloatingArrow>,
  'context'
>;

/**
 * Props for TooltipContent component
 *
 * Content container for tooltip. Renders the actual tooltip content that appears
 * when the trigger is activated. Supports custom styling and is automatically
 * positioned using Floating UI.
 */
export interface TooltipContentProps {
  /**
   * Tooltip content to display
   * Can be text, React nodes, or formatted content
   */
  children: React.ReactNode;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Inline styles for the tooltip content
   */
  style?: React.CSSProperties;
}

export interface TooltipContentSizes {
  small: SerializedStyles;
  medium: SerializedStyles;
  large: SerializedStyles;
}

/**
 * Props for TooltipTrigger component
 *
 * Trigger element that activates the tooltip. Must be a single React element
 * (component or DOM element) that will receive the tooltip trigger props.
 */
export interface TooltipTriggerProps {
  /**
   * Single React element to use as trigger
   * Can be any element (Button, Icon, div, etc.)
   * Must be a valid React element (not fragment or array)
   */
  children: React.ReactNode;

  /**
   * Custom CSS class name
   */
  className?: string;
}

export type SimpleChartTooltipProps<Series extends LineSeries> =
  PointTooltipProps<Series> &
    Pick<TooltipProps, 'size'> & {
      renderValue?: (data: Point<Series>['data']) => React.ReactNode;
    };

export interface ProgressChartTooltipProps {
  caption: string;
  value: number;
  valueFormatted: string;
  iconName?: keyof MapIconsType;
  barProps?: Partial<Omit<ProgressBarProps, 'currentValue'>>;
}

export type UseTooltipContext = () => NonNullable<TooltipContextType>;
