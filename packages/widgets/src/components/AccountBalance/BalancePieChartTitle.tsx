import { css, useTheme } from '@emotion/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
  useFullscreenMode,
} from '@ssa-ui-kit/core';
import { useAccountBalanceContext } from './AccountBalanceContext';

export const BalancePieChartTitle = () => {
  const theme = useTheme();
  const { isFullscreenMode } = useFullscreenMode();
  const { tooltip, total, currency } = useAccountBalanceContext();
  return (
    <Tooltip enableHover enableClick {...tooltip?.config}>
      <TooltipTrigger className={tooltip?.classNames?.trigger}>
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
      {tooltip?.content && (
        <TooltipContent
          css={{ padding: '3px 0' }}
          className={tooltip?.classNames?.content}>
          {tooltip.content}
        </TooltipContent>
      )}
    </Tooltip>
  );
};
