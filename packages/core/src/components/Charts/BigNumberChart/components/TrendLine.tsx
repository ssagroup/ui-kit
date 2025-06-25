import { useTheme } from '@emotion/react';
import { DotsItem, ResponsiveProps } from '@nivo/core';
import {
  LineSeries,
  LineCustomSvgLayerProps,
  ResponsiveLine,
  LineSvgProps,
} from '@nivo/line';
import { TrendLineTooltip, TrendLineTooltipProps } from './TrendLineTooltip';

export interface TrendLineProps<Series extends LineSeries>
  extends ResponsiveProps<LineSvgProps<Series>> {
  color?: string;
  tooltipProps?: Omit<TrendLineTooltipProps<Series>, 'point'>;
}

const ActivePoint = <Series extends LineSeries>({
  currentPoint,
  ...props
}: LineCustomSvgLayerProps<Series>) => (
  <g>
    {currentPoint && (
      <DotsItem
        size={props.pointSize || 10}
        borderWidth={props.pointBorderWidth || 10}
        key={currentPoint.id}
        x={currentPoint.x}
        y={currentPoint.y}
        datum={currentPoint.data}
        color={currentPoint.color}
        borderColor={currentPoint.borderColor}
        labelYOffset={props.pointLabelYOffset}
      />
    )}
  </g>
);

export const TrendLine = <Series extends LineSeries>({
  color,
  tooltipProps,
  ...props
}: TrendLineProps<Series>) => {
  const theme = useTheme();
  const _color = color ?? theme.colors.purpleDark;
  return (
    <ResponsiveLine<Series>
      axisBottom={null}
      axisLeft={null}
      axisRight={null}
      axisTop={null}
      colors={_color}
      curve="linear"
      enableArea={true}
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      lineWidth={2}
      pointBorderWidth={2}
      pointColor="black"
      pointLabelYOffset={-12}
      pointSize={5}
      useMesh={true}
      enableTouchCrosshair={true}
      defs={[
        {
          colors: [
            {
              color: _color,
              offset: 0,
            },
            {
              color: theme.colors.white,
              offset: 100,
            },
          ],
          id: 'gradientA',
          type: 'linearGradient',
        },
      ]}
      fill={[
        {
          id: 'gradientA',
          match: '*',
        },
      ]}
      enableCrosshair={false}
      animate={false}
      yScale={{
        type: 'linear',
        stacked: true,
        reverse: false,
      }}
      pointBorderColor={{ from: 'serieColor' }}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      legends={[]}
      tooltip={(args) => <TrendLineTooltip {...args} {...tooltipProps} />}
      layers={[
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'points',
        'slices',
        'mesh',
        'legends',
        ActivePoint,
      ]}
      {...props}
    />
  );
};
