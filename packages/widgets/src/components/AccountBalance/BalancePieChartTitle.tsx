import { withTheme, css } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { useTextSizeDecrease } from '@ssa-ui-kit/hooks';
import { BalancePieChartTitleProps } from './types';

export const BalancePieChartTitle = withTheme(
  ({ total, currency, theme }: BalancePieChartTitleProps) => {
    const ref = useTextSizeDecrease();
    return (
      <Typography
        ref={ref}
        variant="body2"
        weight="bold"
        color={theme.colors.greyDarker}
        css={css`
          font-size: 13px;
          padding: 0 14px;
          ${theme.mediaQueries.md} {
            font-size: 14px;
          }
          ${theme.mediaQueries.lg} {
            font-size: 16px;
          }
          line-height: 1;
        `}>
        {total}
        <Typography
          variant="body2"
          weight="regular"
          as="span"
          color={theme.colors.greyDarker80}
          css={css`
            display: block;
            font-size: 12px;
            ${theme.mediaQueries.md} {
              font-size: 13px;
            }
            ${theme.mediaQueries.lg} {
              font-size: 14px;
            }
            line-height: 25px;
          `}>
          {currency}
        </Typography>
      </Typography>
    );
  },
);
