import { Tag } from '@ssa-ui-kit/core';
import { TradeProps } from './types';
import { tradeStatuses } from './consts';

export const Trade = ({ tradeType }: TradeProps) => {
  const color = tradeStatuses[tradeType]['color'];
  const title = tradeStatuses[tradeType]['title'];
  return (
    <Tag
      color={color}
      extraCSS={{
        borderRadius: 25,
        border: 'none',
        boxShadow: 'none',
        height: 22,
        padding: '1px 12px',
        fontSize: 14,
      }}>
      {title}
    </Tag>
  );
};

const C = ({ p }: { p: boolean }) => {
  return <>test</>;
};

<C p />;
