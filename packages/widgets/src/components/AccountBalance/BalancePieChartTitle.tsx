import { withTheme, css } from '@emotion/react';
import { Typography, useFullscreenMode } from '@ssa-ui-kit/core';
import { useTextSizeDecrease } from '@ssa-ui-kit/hooks';
import { BalancePieChartTitleProps } from './types';

export const BalancePieChartTitle = withTheme(
  ({ total, currency, theme }: BalancePieChartTitleProps) => {
    const ref = useTextSizeDecrease();
    const { isFullscreenMode } = useFullscreenMode();
    return (
      <Typography
        ref={ref}
        variant="body2"
        weight="bold"
        color={theme.colors.greyDarker}
        css={
          isFullscreenMode
            ? css`
                font-size: 24px !important;
                font-weight: 500;
              `
            : css`
                font-size: 13px;
                padding: 0 14px;
                line-height: 1;
              `
        }>
        {total}
        <Typography
          variant="body2"
          weight="regular"
          as="span"
          color={theme.colors.greyDarker80}
          css={
            isFullscreenMode
              ? css`
                  font-size: 18px;
                  margin-left: 10px;
                `
              : css`
                  display: block;
                  font-size: 12px;
                  ${theme.mediaQueries.md} {
                    font-size: 13px;
                  }
                  ${theme.mediaQueries.lg} {
                    font-size: 14px;
                  }
                  line-height: 25px;
                `
          }>
          {currency}
        </Typography>
      </Typography>
    );
  },
);
