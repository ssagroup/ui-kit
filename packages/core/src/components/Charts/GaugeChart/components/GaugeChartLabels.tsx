import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Wrapper from '@components/Wrapper';

export const GaugeChartLabel = styled.span`
  line-height: 0;
  color: ${({ theme }) => theme.colors.greyDarker60};
`;

export interface GaugeChartLabelsProps {
  width: string;
  withLabels?: boolean;
  value?: number;
  unitLabel?: string;
  minLabel?: string;
  maxLabel?: string;
  totalLabel?: string;
}

export const GaugeChartLabels = ({
  width,
  withLabels,
  value,
  unitLabel,
  minLabel,
  maxLabel,
  totalLabel,
}: GaugeChartLabelsProps) => {
  const theme = useTheme();
  return (
    <Wrapper
      css={{
        width,
        justifyContent: 'space-between',
      }}>
      <GaugeChartLabel>{withLabels && minLabel}</GaugeChartLabel>
      <div css={{ textAlign: 'center' }}>
        <div css={{ marginBottom: 8 }}>
          <GaugeChartLabel>{withLabels && totalLabel}</GaugeChartLabel>
        </div>
        <GaugeChartLabel
          css={{
            fontSize: 28,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            color: 'unset',
          }}>
          <span>{value} </span>
          <GaugeChartLabel
            css={{
              fontSize: 18,
              fontWeight: 500,
              color: theme.colors.greyDarker80,
            }}>
            {unitLabel}
          </GaugeChartLabel>
        </GaugeChartLabel>
      </div>
      <GaugeChartLabel>{withLabels && maxLabel}</GaugeChartLabel>
    </Wrapper>
  );
};
