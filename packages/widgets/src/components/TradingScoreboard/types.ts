import { ITradingInfoCardProps } from '@components/TradingInfoCard/types';
import { SerializedStyles } from '@emotion/react';

type TradingScoreboardItem = Pick<
  ITradingInfoCardProps,
  'value' | 'unit' | 'title' | 'icon' | 'link'
>;

export interface ITradingScoreboardProps {
  itemsPerRow: number;
  items: Array<TradingScoreboardItem>;
  onClick?: (item: TradingScoreboardItem) => void;
  renderCard?: (
    item: TradingScoreboardItem,
    onClick?: (item: TradingScoreboardItem) => void,
  ) => React.ReactNode;
  css?: SerializedStyles;
}
