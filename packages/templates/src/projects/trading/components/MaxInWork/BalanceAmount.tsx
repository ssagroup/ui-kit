import { useTheme } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { MaxInWorkProps } from './types';

type BalanceAmountProps = Pick<MaxInWorkProps, 'amount' | 'currency'>;

export const BalanceAmount = ({ amount, currency }: BalanceAmountProps) => {
  const theme = useTheme();
  return (
    <Typography
      weight="bold"
      css={{
        fontSize: '16px',
        lineHeight: 1,
        minHeight: 16,
        [theme.mediaQueries.md]: {
          fontSize: '14px',
          marginBottom: '12px',
          minHeight: 14,
        },
        [theme.mediaQueries.lg]: {
          fontSize: '16px',
          minHeight: 16,
        },
      }}>
      {amount}{' '}
      <span
        css={{
          color: theme.colors.greyDarker80,
          fontSize: '12px',
          [theme.mediaQueries.md]: {
            fontSize: '10px',
          },
          [theme.mediaQueries.lg]: {
            fontSize: '12px',
          },
        }}>
        {currency}
      </span>
    </Typography>
  );
};
