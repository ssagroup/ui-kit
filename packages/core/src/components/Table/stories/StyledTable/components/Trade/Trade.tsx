import { TableTag } from '../TableTag';

import { tradeStatuses } from './consts';
import { TradeProps } from './types';

export const Trade = ({ tradeType }: TradeProps) => {
  const { color, title } = tradeStatuses[tradeType];
  return <TableTag color={color as keyof MainColors}>{title}</TableTag>;
};
