import { ComponentProps } from 'react';
import { useTheme } from '@emotion/react';
import { ResponsiveRadar } from '@nivo/radar';
import { WidgetCardProps, WithWidgetCard } from '@components/WidgetCard';
import { WithFullscreenMode } from '@components/FullscreenModeContext';
import { RadarChartHeader, RadarChartTooltip } from './components';

export type RadarChartFeatures = 'header' | 'fullscreenMode';

type ResponsiveRadarProps<D extends Record<string, unknown>> = ComponentProps<
  typeof ResponsiveRadar<D>
>;

export interface RadarChartProps<D extends Record<string, unknown>>
  extends Omit<ResponsiveRadarProps<D>, 'legends'> {
  title?: string;
  legends?: Partial<NonNullable<ResponsiveRadarProps<D>['legends']>[number]>[];
  features?: RadarChartFeatures[];
  widgetCardProps?: WidgetCardProps;
}

export const RadarChartComponent = <D extends Record<string, unknown>>({
  title,
  widgetCardProps,
  features = [],
  ...radarProps
}: RadarChartProps<D>) => {
  const theme = useTheme();
  const { legends, ...restRadarProps } = radarProps;
  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        title,
        headerContent: <RadarChartHeader features={features} />,
        ...widgetCardProps,
      }}>
      <div
        css={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
        <div
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            '& svg > g > g:nth-child(1) > line': {
              display: 'none',
            },
          }}>
          <ResponsiveRadar
            margin={{ top: 20, bottom: 30 }}
            gridShape="linear"
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: -20,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 10,
                symbolShape: 'circle',
                itemTextColor: theme.colors.greyDarker,
                ...legends?.at(0),
              },
            ]}
            theme={{
              legends: { text: { fontSize: '12px' } },
            }}
            sliceTooltip={(props) => <RadarChartTooltip {...props} />}
            {...restRadarProps}
          />
        </div>
      </div>
    </WithWidgetCard>
  );
};

export const RadarChart = WithFullscreenMode(RadarChartComponent);
