import { useState } from 'react';
import { Datum, PointMouseHandler } from '@nivo/line';
import { useThrottledCallback } from '@ssa-ui-kit/hooks';
import { WithFullscreenMode } from '@components/FullscreenModeContext';
import { Wrapper, WidgetCardProps, WithWidgetCard } from '@components';
import { BigNumberChartHeader, TrendLine, TrendLineProps } from './components';

export type BigNumberChartFeatures = 'header' | 'fullscreenMode';

export interface BigNumberChartProps {
  data: Datum[];
  interactive?: boolean;
  title?: string;
  widgetCardProps?: WidgetCardProps;
  trendLineProps?: Omit<TrendLineProps, 'data'>;
  features?: BigNumberChartFeatures[];
  valueFormat?: (value: Datum) => React.ReactNode;
}

export const BigNumberChartComponent = ({
  data,
  title,
  widgetCardProps,
  trendLineProps,
  interactive = true,
  features = [],
  valueFormat,
}: BigNumberChartProps) => {
  const [hoveredValue, setHoveredValue] = useState<Datum | null>(null);

  const lastValue = data
    .sort((a, b) => {
      const ax = a.x ?? 0;
      const bx = b.x ?? 0;
      return Number(ax) - Number(bx);
    })
    .at(-1);

  const setHoveredValueThrottled = useThrottledCallback(
    (value: Datum | null) => {
      setHoveredValue(value);
    },
    100,
  );

  const handleMouseMove: PointMouseHandler = (data) => {
    if (!interactive) return;
    setHoveredValueThrottled(data.data);
  };

  const value = hoveredValue ?? lastValue;

  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        title,
        headerContent: <BigNumberChartHeader features={features} />,
        ...widgetCardProps,
      }}>
      <Wrapper
        direction="column"
        alignItems="start"
        css={{ height: '100%', justifyContent: 'space-between' }}>
        <div css={{ fontSize: '32px', fontWeight: 700 }}>
          <span>{value && (valueFormat?.(value) ?? value?.y?.toString())}</span>
        </div>
        <div
          css={{
            position: 'relative',
            width: '100%',
            height: '50%',
          }}>
          <div css={{ position: 'absolute', width: '100%', height: '100%' }}>
            <TrendLine
              {...trendLineProps}
              data={[{ id: 'trend-line', data }]}
              onMouseMove={handleMouseMove}
              lastActivePoint={value}
            />
          </div>
        </div>
      </Wrapper>
    </WithWidgetCard>
  );
};

export const BigNumberChart = WithFullscreenMode(
  BigNumberChartComponent,
) as typeof BigNumberChartComponent;
