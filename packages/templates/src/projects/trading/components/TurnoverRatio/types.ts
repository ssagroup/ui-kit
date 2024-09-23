import { Statistics } from '@trading/types';
import { WidgetCardProps } from '../WidgetCard';

export type TurnoverRatioProps = {
  data: Statistics['turnoverRatio'];
} & Pick<WidgetCardProps, 'className'>;
