import { useState } from 'react';
import {
  isPoint,
  LineSeries,
  Point,
  PointOrSliceMouseHandler,
} from '@nivo/line';
import { useThrottledCallback } from '@ssa-ui-kit/hooks';
import { WithFullscreenMode } from '@components/FullscreenModeContext';
import { Wrapper, WidgetCardProps, WithWidgetCard } from '@components';
import { BigNumberChartHeader, TrendLine, TrendLineProps } from './components';

export type BigNumberChartFeatures = 'header' | 'fullscreenMode';

export interface BigNumberChartProps<Series extends LineSeries> {
  data: Series['data'];
  interactive?: boolean;
  title?: string;
  widgetCardProps?: WidgetCardProps;
  trendLineProps?: Omit<TrendLineProps<Series>, 'data'>;
  features?: BigNumberChartFeatures[];
  valueFormat?: (value: Series['data'][number]) => React.ReactNode;
}

export const BigNumberChartComponent = <Series extends LineSeries>({
  data,
  title,
  widgetCardProps,
  trendLineProps,
  interactive = true,
  features = [],
  valueFormat,
}: BigNumberChartProps<Series>) => {
  const [hoveredValue, setHoveredValue] = useState<Point<Series> | null>(null);

  const lastValue = [...data]
    .sort((a, b) => {
      const ax = a.x ?? 0;
      const bx = b.x ?? 0;
      return Number(ax) - Number(bx);
    })
    .at(-1);

  const setHoveredValueThrottled = useThrottledCallback(
    (value: Point<Series> | null) => {
      setHoveredValue(value);
    },
    100,
  );

  const handleMouseMove: PointOrSliceMouseHandler<Series> = (data) => {
    if (!interactive || !isPoint(data)) return;
    setHoveredValueThrottled(data);
  };

  const handleMouseLeave = () => {
    setHoveredValueThrottled(null);
  };

  const value = hoveredValue?.data ?? lastValue;
  const seriesData = [{ id: 'trend-line', data }] as Series[];

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
              data={seriesData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
