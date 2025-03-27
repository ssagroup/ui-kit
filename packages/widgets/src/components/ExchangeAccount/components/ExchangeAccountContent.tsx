import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { CardContent, PieChartProps } from '@ssa-ui-kit/core';

import * as S from '../styles';
import { useExchangeAccountContext } from './ExchangeAccountProvider';

import { BalancePieChart } from '@components/AccountBalance';

export interface ExchangeAccountContentProps
  extends Omit<React.ComponentProps<typeof CardContent>, 'children'> {
  pieChartProps?: Partial<Omit<PieChartProps, 'data'>>;
}

export const ExchangeAccountContent = ({
  pieChartProps,
  ...cardProps
}: ExchangeAccountContentProps) => {
  const theme = useTheme();
  const { data, pieChartProps: contextPieChartProps } =
    useExchangeAccountContext();

  return (
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
  );
};
