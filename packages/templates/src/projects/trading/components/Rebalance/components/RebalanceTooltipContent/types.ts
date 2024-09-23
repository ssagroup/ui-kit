import { RebalancingItem } from '@trading/types';

export type RebalanceTooltipContentProps = {
  event: Readonly<Plotly.PlotMouseEvent> | null;
  data: RebalancingItem | null;
};
