import { css, useTheme } from '@emotion/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
} from '@ssa-ui-kit/core';

import { ITradingInfoCardTooltipProps } from './types';

const TradingInfoCardTooltip = ({
  trigger,
  children,
}: ITradingInfoCardTooltipProps) => {
  const theme = useTheme();
  return (
    <Tooltip
      offsetPx={0}
      enableHover={true}
      enableClick={false}
      arrowProps={{
        width: 18,
        height: 3,
        fill: theme.colors.greyGraphite,
      }}>
      <TooltipTrigger>
        <div data-testid="tooltip-trigger">{trigger}</div>
      </TooltipTrigger>
      <TooltipContent
        css={css`
          padding: 4px 5px;
          border-radius: 2px;
          background: ${theme.colors.greyGraphite};

          svg {
            margin-bottom: -1px;
          }
        `}>
        <Typography css={{ fontSize: '12px' }} color={theme.colors.white}>
          {children}
        </Typography>
      </TooltipContent>
    </Tooltip>
  );
};

export default TradingInfoCardTooltip;
