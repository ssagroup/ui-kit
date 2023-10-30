import { TradeProps } from './types';
import { tradeStatuses } from './consts';
import { TableTag } from '../TableTag';

export const Trade = ({ tradeType }: TradeProps) => {
  const { color, title } = tradeStatuses[tradeType];
  return <TableTag color={color}>{title}</TableTag>;
};
