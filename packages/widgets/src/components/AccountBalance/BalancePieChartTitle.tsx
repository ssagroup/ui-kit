import { withTheme, css } from '@emotion/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
  useFullscreenMode,
} from '@ssa-ui-kit/core';
import { useAccountBalanceContext } from './AccountBalanceContext';
import { BalancePieChartTitleProps } from './types';

export const BalancePieChartTitle = withTheme(
  ({ theme }: BalancePieChartTitleProps) => {
    const { isFullscreenMode } = useFullscreenMode();
    const { tooltipConfig, tooltipContent, total, currency } =
      useAccountBalanceContext();
    return (
      <Tooltip enableHover enableClick {...tooltipConfig}>
        <TooltipTrigger>
          <Typography
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
                    font-size: 12px;
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
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent css={{ padding: '3px 0' }}>
            {tooltipContent}
          </TooltipContent>
        )}
      </Tooltip>
    );
  },
);
