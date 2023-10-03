import { ITradingInfoCardProps } from '@components/TradingInfoCard/types';
import { SerializedStyles } from '@emotion/react';

type TradingScoreboardType = Pick<
  ITradingInfoCardProps,
  'value' | 'unit' | 'title' | 'icon' | 'link'
>;

export interface ITradingScoreboardProps {
  itemsPerRow: number;
  items: Array<TradingScoreboardType>;
  onClick?: (item: TradingScoreboardType) => void;
  renderCard?: (
    item: TradingScoreboardType,
    onClick?: (item: TradingScoreboardType) => void,
  ) => React.ReactNode;
  css?: SerializedStyles;
}
