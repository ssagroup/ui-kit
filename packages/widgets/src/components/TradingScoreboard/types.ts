import { ITradingInfoCardProps } from '@components/TradingInfoCard/types';
import { SerializedStyles } from '@emotion/react';

type TradingCard = Pick<
  ITradingInfoCardProps,
  'value' | 'unit' | 'title' | 'icon'
>;

export interface ITradingScoreboardProps {
  itemsPerRow: number;
  items: Array<TradingCard>;
  onClick?: (item: TradingCard) => void;
  renderCard?: (
    item: ITradingInfoCardProps,
    onClick?: (item: TradingCard) => void,
  ) => React.ReactNode;
  css?: SerializedStyles;
}
