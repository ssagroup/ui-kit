export type PlotTooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center';

export type PlotTooltipProps = {
  x: number;
  y: number;
  children: React.ReactNode;
  position?: PlotTooltipPosition;
};

export type PlotTooltipState = Pick<
  PlotTooltipProps,
  'x' | 'y' | 'position'
> & {
  visible: boolean;
};
