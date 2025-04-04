import { WidgetCardProps, WithWidgetCard } from '@components/WidgetCard';
import Wrapper from '@components/Wrapper';
import { useTheme } from '@emotion/react';

import {
  GaugeChartBase,
  GaugeChartBaseProps,
  GaugeChartCanvas,
  GaugeChartHeader,
  GaugeChartLabels,
  GaugeChartLabelsProps,
  GaugeChartLayer,
  GaugeChartNeedle,
  GaugeChartTickers,
  GaugeChartTickersProps,
} from './components';
import { calculateFittedSize, centeredOffset, normalizeToRange } from './utils';
import { useElementSize } from '@ssa-ui-kit/hooks';
import { WithFullscreenMode } from '@components/FullscreenModeContext';

export type GaugeChartFeature = 'header' | 'fullscreenMode';

export interface GaugeChartProps
  extends Pick<
      GaugeChartLabelsProps,
      'maxLabel' | 'minLabel' | 'unitLabel' | 'totalLabel'
    >,
    Pick<GaugeChartTickersProps, 'ticks'> {
  minValue: number;
  maxValue: number;
  value: number;
  title?: string;
  segments?: {
    value: number;
    id?: string;
    color?: string;
  }[];
  withLabels?: boolean;
  withTrack?: boolean;
  withNeedle?: boolean;
  chartProps?: Omit<GaugeChartBaseProps, 'data'>;
  trackProps?: Omit<GaugeChartBaseProps, 'data'>;
  features?: GaugeChartFeature[];
  widgetCardProps?: WidgetCardProps;
}

const GaugeChartComponent = ({
  minLabel,
  maxLabel,
  totalLabel,
  unitLabel,
  minValue,
  maxValue,
  value,
  title,
  chartProps,
  trackProps,
  widgetCardProps,
  withLabels = true,
  withTrack = true,
  withNeedle = true,
  features = [],
  segments = [],
  ticks = [],
}: GaugeChartProps) => {
  const theme = useTheme();
  const { ref: containerRef, ...containerSize } =
    useElementSize<HTMLDivElement>();

  const normalizedValue = normalizeToRange(value, minValue, maxValue, 0, 100);

  const normalizedSegments = segments.map((segment, index) => {
    const prev = segments[index - 1];
    const start = normalizeToRange(
      prev?.value ?? minValue,
      minValue,
      maxValue,
      0,
      100,
    );
    const end = normalizeToRange(segment.value, minValue, maxValue, 0, 100);

    return {
      ...segment,
      value: end - start,
    };
  });

  if (normalizedSegments.length === 0) {
    normalizedSegments.push({
      value: normalizedValue,
      color: theme.colors.blueLight,
    });
  }

  // ensure normalized segments value sum to 100
  const totalValue = normalizedSegments.reduce(
    (acc, segment) => acc + segment.value,
    0,
  );
  if (totalValue !== 100) {
    normalizedSegments.push({
      value: 100 - totalValue,
      color: 'transparent',
    });
  }

  const needleAngle = 180 + (normalizedValue / 100) * 180;

  const trackSize = 100;
  const pieAspectRatio = 2;
  const pieSize = calculateFittedSize(containerSize, pieAspectRatio);
  const pieOffset = centeredOffset(containerSize, pieSize);

  return (
    <div css={{ height: '100%' }}>
      <WithWidgetCard
        features={features}
        cardProps={{
          title,
          headerContent: <GaugeChartHeader features={features} />,
          ...widgetCardProps,
        }}>
        <Wrapper
          direction="column"
          css={{
            justifyContent: 'center',
            height: '100%',
          }}>
          <GaugeChartCanvas>
            <GaugeChartLayer>
              {withTrack && (
                <GaugeChartBase
                  data={[{ value: trackSize }]}
                  colors={theme.colors.greyLighter}
                  layers={['arcs']}
                  {...trackProps}
                />
              )}
            </GaugeChartLayer>
            <GaugeChartLayer ref={containerRef}>
              <GaugeChartBase data={normalizedSegments} {...chartProps} />
              <GaugeChartTickers
                pieOffset={pieOffset}
                pieSize={pieSize}
                minValue={minValue}
                maxValue={maxValue}
                ticks={ticks}
              />
              {withNeedle && (
                <GaugeChartNeedle
                  needleAngle={needleAngle}
                  pieOffset={pieOffset}
                  pieSize={pieSize}
                />
              )}
            </GaugeChartLayer>
          </GaugeChartCanvas>
          {pieSize.height > 0 && (
            <GaugeChartLabels
              withLabels={withLabels}
              width={`${pieSize.width}px`}
              value={value}
              unitLabel={unitLabel}
              minLabel={minLabel}
              maxLabel={maxLabel}
              totalLabel={totalLabel}
            />
          )}
        </Wrapper>
      </WithWidgetCard>
    </div>
  );
};

export const GaugeChart = WithFullscreenMode(GaugeChartComponent);
