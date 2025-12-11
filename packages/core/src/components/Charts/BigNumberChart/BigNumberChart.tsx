import { useState } from 'react';
import { PointOrSliceMouseHandler, DefaultSeries } from '@nivo/line';
import { useThrottledCallback, useElementSize } from '@ssa-ui-kit/hooks';
import { WithFullscreenMode } from '@components/FullscreenModeContext';
import { Wrapper, WidgetCardProps, WithWidgetCard } from '@components';
import { BigNumberChartHeader, TrendLine, TrendLineProps } from './components';

export type BigNumberChartFeatures = 'header' | 'fullscreenMode';

type Datum = DefaultSeries['data'][number];

export interface BigNumberChartProps {
  data: Datum[];
  interactive?: boolean;
  title?: string;
  widgetCardProps?: WidgetCardProps;
  trendLineProps?: Omit<TrendLineProps, 'data' | 'height' | 'width'>;
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
  const {
    ref: chartContainerRef,
    width,
    height,
  } = useElementSize<HTMLDivElement>();

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

  const handleMouseMove: PointOrSliceMouseHandler<DefaultSeries> = (datum) => {
    if (!interactive) return;
    if ('data' in datum) {
      setHoveredValueThrottled(datum.data);
    }
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
          ref={chartContainerRef}
          css={{
            position: 'relative',
            width: '100%',
            height: '50%',
            minHeight: '100px',
          }}>
          {width > 0 && height > 0 && (
            <TrendLine
              {...trendLineProps}
              data={[{ id: 'trend-line', data }]}
              onMouseMove={handleMouseMove}
              lastActivePoint={value}
              height={height}
              width={width}
            />
          )}
        </div>
      </Wrapper>
    </WithWidgetCard>
  );
};

export const BigNumberChart = WithFullscreenMode(
  BigNumberChartComponent,
) as typeof BigNumberChartComponent;
