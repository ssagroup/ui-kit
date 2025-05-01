import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import { WithLink } from '@ssa-ui-kit/core';
import { BalancePieChart } from './BalancePieChart';
import { AccountBalanceProps } from './types';
import { AccountBalanceProvider } from './AccountBalanceContext';

export const AccountBalance = ({
  title = 'Balance',
  className,
  onClick,
  link,
  variant = 'valueList',
  fullscreenModeFeature = false,
  activeHighlight = true,
  widgetMaxWidth = '280px',
  tooltip = {},
  total,
  currency,
  ...props
}: AccountBalanceProps) => {
  const theme = useTheme();
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);

  return (
    <AccountBalanceProvider
      activeHighlight={activeHighlight}
      fullscreenModeFeature={fullscreenModeFeature}
      tooltip={tooltip}
      variant={variant}
      total={total}
      title={title}
      currency={currency}>
      <WithLink link={link} onClick={onClick}>
        <BalancePieChart
          theme={theme}
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
                  & .pie-chart-wrapper > div:last-of-type {
                    pointer-events: ${tooltip?.content ? 'auto' : 'none'};
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
    </AccountBalanceProvider>
  );
};
