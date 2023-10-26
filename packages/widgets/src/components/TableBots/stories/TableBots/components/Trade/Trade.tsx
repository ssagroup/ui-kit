import { TradeProps } from './types';
import { tradeStatuses } from './consts';
import { TableTag } from '../TableTag';

export const Trade = ({ tradeType }: TradeProps) => {
  const color = tradeStatuses[tradeType]['color'];
  const title = tradeStatuses[tradeType]['title'];
  return <TableTag color={color}>{title}</TableTag>;
};
