import { KeeperRunsItem } from '@trading/types';

export type KeeperRunsTooltipContentProps = {
  event: Readonly<Plotly.PlotMouseEvent> | null;
  data: KeeperRunsItem | null;
};
