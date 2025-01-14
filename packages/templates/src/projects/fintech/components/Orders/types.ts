import { RequestPeriod, GraphsListItem } from '@fintech/types';

export type OrderProps = {
  data: Array<GraphsListItem>;
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};

export type OrdersBarRectProps = {
  color?: string;
  clipPathId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement>) => void;
  onMouseMove?: (event: React.MouseEvent<SVGRectElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement>) => void;
};
