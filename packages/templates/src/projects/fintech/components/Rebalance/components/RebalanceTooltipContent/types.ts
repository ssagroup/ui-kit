import { RebalancingItem } from '@fintech/types';

export type RebalanceTooltipContentProps = {
  event: Readonly<Plotly.PlotMouseEvent> | null;
  data: RebalancingItem | null;
};
