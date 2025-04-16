import { Wrapper, WithWidgetCard } from '@components';
import { WithFullscreenMode } from '@components/FullscreenModeContext';
import { BarGaugeChartHeader, GaugeBar } from './components';
import { BarGaugeChartProps } from './types';

export const BarGaugeChartComponent = ({
  title,
  widgetCardProps,
  bars = [],
  features = [],
}: BarGaugeChartProps) => (
  <WithWidgetCard
    features={features}
    cardProps={{
      title,
      headerContent: <BarGaugeChartHeader features={features} />,
      ...widgetCardProps,
    }}>
    <Wrapper
      direction="column"
      alignItems="start"
      css={{ height: '100%', gap: '12px' }}>
      {bars.map((barProps, index) => (
        <GaugeBar key={index} {...barProps} />
      ))}
    </Wrapper>
  </WithWidgetCard>
);

export const BarGaugeChart = WithFullscreenMode(BarGaugeChartComponent);
