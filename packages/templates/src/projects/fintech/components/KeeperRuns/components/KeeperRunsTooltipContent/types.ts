import { KeeperRunsItem } from '@fintech/types';

export type KeeperRunsTooltipContentProps = {
  event: Readonly<Plotly.PlotMouseEvent> | null;
  data: KeeperRunsItem | null;
};
