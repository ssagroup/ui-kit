import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

import { CardContent, PieChartProps } from '@ssa-ui-kit/core';

import { BalancePieChart } from '@components/AccountBalance';
import { AccountBalanceProvider } from '@components/AccountBalance/AccountBalanceContext';

import * as S from '../styles';

import { useExchangeAccountContext } from './ExchangeAccountProvider';

export interface ExchangeAccountContentProps
  extends Omit<React.ComponentProps<typeof CardContent>, 'children'> {
  pieChartProps?: Partial<Omit<PieChartProps, 'data'>>;
}

export const ExchangeAccountContent = ({
  pieChartProps,
  ...cardProps
}: ExchangeAccountContentProps) => {
  const theme = useTheme();
  const {
    data,
    pieChartProps: contextPieChartProps,
    title,
  } = useExchangeAccountContext();

  return (
    <AccountBalanceProvider
      activeHighlight={pieChartProps?.activeHighlight}
      fullscreenModeFeature={false}
      tooltip={data.tooltip}
      variant={data.variant}
      total={data.total}
      title={title}
      currency={data.currency}>
      <CardContent css={S.CardContent} direction="column" {...cardProps}>
        <BalancePieChart
          theme={theme}
          pieChartProps={{
            className: css`
              ${theme.mediaQueries.md} {
                flex-direction: row;
              }
              ${theme.mediaQueries.lg} {
                flex-direction: column;
              }
            `,
            ...contextPieChartProps,
            ...pieChartProps,
          }}
          {...data}
        />
      </CardContent>
    </AccountBalanceProvider>
  );
};
