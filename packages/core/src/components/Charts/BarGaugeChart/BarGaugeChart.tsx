import { Wrapper, WithWidgetCard, WidgetCardProps } from '@components';
import { WithFullscreenMode } from '@components/FullscreenModeContext';
import { BarGaugeChartHeader, GaugeBar, GaugeBarProps } from './components';

export type BarGaugeChartFeature = 'header' | 'fullscreenMode';

export interface BarGaugeChartProps {
  title?: string;
  widgetCardProps?: WidgetCardProps;
  bars?: GaugeBarProps[];
  features?: BarGaugeChartFeature[];
}

export const BarGaugeChartComponent = ({
  title,
  widgetCardProps,
  bars = [],
  features = [],
}: BarGaugeChartProps) => {
  return (
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
};

export const BarGaugeChart = WithFullscreenMode(BarGaugeChartComponent);
