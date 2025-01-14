import { WidgetCardProps } from '../WidgetCard';

export type MaxInWorkProps = {
  amount: number;
  percent: number;
  currency: string;
} & Pick<WidgetCardProps, 'link' | 'onClick' | 'className'>;
