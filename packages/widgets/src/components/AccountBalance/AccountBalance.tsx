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
  ...props
}: AccountBalanceProps) => {
  const theme = useTheme();

  return (
    <WithLink link={link} onClick={onClick}>
      <BalancePieChart
        theme={theme}
        variant={variant}
        fullscreenModeFeature={fullscreenModeFeature}
        pieChartProps={{
          cardProps: {
            title,
            className,
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
