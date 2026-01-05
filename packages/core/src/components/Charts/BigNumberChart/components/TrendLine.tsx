import { useTheme } from '@emotion/react';
import { DotsItem } from '@nivo/core';
import {
  LineSvgProps,
  LineCustomSvgLayerProps,
  LineSvgLayer,
  Point,
  LineSeries,
  ResponsiveLine as ResponsiveLineOriginal,
} from '@nivo/line';
import { TrendLineTooltip, TrendLineTooltipProps } from './TrendLineTooltip';
import { wrapNivoResponsiveComponent } from '../../utils/nivoReact19Compat';

const ResponsiveLine = wrapNivoResponsiveComponent(
  ResponsiveLineOriginal,
  'ResponsiveLine',
);

type Datum = LineSeries['data'][number];

export interface TrendLineProps extends Omit<
  LineSvgProps<LineSeries>,
  'data' | 'height' | 'width'
> {
  color?: string;
  tooltipValueFormat?: TrendLineTooltipProps<LineSeries>['valueFormat'];
  lastActivePoint?: Datum;
  data: LineSvgProps<LineSeries>['data'];
  height: number;
  width: number;
}

type ActivePointExtraProps = {
  currentPoint: Point<LineSeries>;
  lastActivePoint?: Datum;
};

const ActivePoint = ({
  currentPoint,
  lastActivePoint,
  points,
  ...props
}: LineCustomSvgLayerProps<LineSeries> & ActivePointExtraProps) => {
  const activePoint = lastActivePoint
    ? points.find(
        ({ data }) =>
          data.x === lastActivePoint.x && data.y === lastActivePoint.y,
      )
    : currentPoint;

  return (
    <g>
      {activePoint && (
        <DotsItem
          size={props.pointSize || 10}
          borderWidth={props.pointBorderWidth || 10}
          key={activePoint.id}
          x={activePoint.x}
          y={activePoint.y}
          datum={activePoint.data}
          color={activePoint.color}
          borderColor={activePoint.borderColor}
          labelYOffset={props.pointLabelYOffset}
        />
      )}
    </g>
  );
};

export const TrendLine = ({
  color,
  tooltipValueFormat,
  ...props
}: TrendLineProps) => {
  const theme = useTheme();
  const _color = color ?? theme.colors.purpleDark;
  return (
    <ResponsiveLine
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
      tooltip={(args) => (
        <TrendLineTooltip {...args} valueFormat={tooltipValueFormat} />
      )}
      layers={
        [
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
        ] as LineSvgLayer<LineSeries>[]
      }
      {...props}
    />
  );
};
