import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import { WithLink } from '@ssa-ui-kit/core';
import { BalancePieChart } from './BalancePieChart';
import { AccountBalanceProps } from './types';

export const AccountBalance = ({
  title = 'Balance',
  className,
  onClick,
  link,
  variant = 'valueList',
  fullscreenModeFeature = false,
  activeHighlight = true,
  widgetMaxWidth = '280px',
  ...props
}: AccountBalanceProps) => {
  const theme = useTheme();
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);

  return (
    <WithLink link={link} onClick={onClick}>
      <BalancePieChart
        theme={theme}
        variant={variant}
        fullscreenModeFeature={fullscreenModeFeature}
        activeHighlight={activeHighlight}
        onFullscreenModeChange={setIsFullscreenMode}
        pieChartProps={{
          width: '100%',
          cardProps: {
            title,
            className: [
              css`
                & > div:last-of-type {
                  max-width: ${isFullscreenMode ? '100%' : widgetMaxWidth};
                }
              `,
              className,
            ].join(' '),
            headerClassName: css([
              {
                fontSize: 11,
              },
            ]),
            contentClassName: css([
              {
                [theme.mediaQueries.md]: {
                  alignItems: 'center !important',
                },
              },
            ]),
          },
        }}
        {...props}
      />
    </WithLink>
  );
};
