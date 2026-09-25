import { ReactNode } from 'react';
import { TooltipProps } from '@components/Tooltip/types';

/** Shape of a FunnelChart: an inverted funnel with a stem, or a pyramid */
export type FunnelChartType = 'funnel' | 'triangle';

/** One level of a FunnelChart, listed top to bottom in `data` */
export interface FunnelChartItem {
  /** Name of the stage — shown in the default tooltip and accessible label */
  label: string;
  /** Value of the stage; `0` is rendered like any other value */
  value: number | string;
  /** Overrides the palette colour of this level */
  color?: string;
  id?: string | number;
}

/** Receives the whole item and its zero-based level index */
export type FunnelChartRender = (
  item: FunnelChartItem,
  index: number,
) => ReactNode;

/** Props for the FunnelChart component */
export interface FunnelChartProps {
  /** Levels from top to bottom. Every level has the same height. */
  data: FunnelChartItem[];
  /**
   * Shape of the chart
   * @default 'funnel'
   */
  type?: FunnelChartType;
  /**
   * Render a leader line and a label beside each level
   * @default false
   */
  withPointer?: boolean;
  /**
   * Show a tooltip when a level is hovered
   * @default true
   */
  withTooltip?: boolean;
  /**
   * Show the labels inside the levels. Pointer labels are controlled by
   * `withPointer`.
   * @default true
   */
  withLabels?: boolean;
  /**
   * Content inside a level. Return `null` to leave a single level empty.
   * @default the level number, starting at 1
   */
  renderLabel?: FunnelChartRender;
  /**
   * Content beside a level when `withPointer` is on
   * @default the item's value
   */
  renderPointerLabel?: FunnelChartRender;
  /**
   * Tooltip content
   * @default "label: value"
   */
  renderTooltip?: FunnelChartRender;
  /** Props forwarded to every level's Tooltip, e.g. `size` or `color` */
  tooltipProps?: Partial<Omit<TooltipProps, 'children'>>;
  className?: string;
  /** Accessible name; defaults to a list of the levels' labels and values */
  'aria-label'?: string;
}
