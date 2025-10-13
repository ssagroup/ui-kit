import { SerializedStyles } from '@emotion/react';

import { TradingInfoCardProps } from '@components/TradingInfoCard/types';

type TradingScoreboardItem = Pick<
  TradingInfoCardProps,
  'value' | 'unit' | 'title' | 'icon' | 'link'
>;

export interface TradingScoreboardProps {
  itemsPerRow: number;
  items: Array<TradingScoreboardItem>;
  onClick?: (item: TradingScoreboardItem) => void;
  renderCard?: (
    item: TradingScoreboardItem,
    onClick?: (item: TradingScoreboardItem) => void,
  ) => React.ReactNode;
  css?: SerializedStyles;
}
