import { ITradingInfoCardProps } from '@components/TradingInfoCard/types';
import { SerializedStyles } from '@emotion/react';

export interface ITradingScoreboardProps {
  itemsPerRow: number;
  items: Array<ITradingInfoCardProps>;
  onClick?: (item: ITradingInfoCardProps) => void;
  renderCard?: (
    item: ITradingInfoCardProps,
    onClick?: (item: ITradingInfoCardProps) => void,
  ) => React.ReactNode;
  css?: SerializedStyles;
}
