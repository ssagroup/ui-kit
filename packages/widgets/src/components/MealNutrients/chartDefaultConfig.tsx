import { LineSeries, LineSvgProps } from '@nivo/line';
import { DotsItem, ResponsiveProps } from '@nivo/core';

import { dateFormatters } from '@ssa-ui-kit/utils';

import { CustomPointLayerProps } from './types';

type LineProps = ResponsiveProps<LineSvgProps<LineSeries>>;

const { formatDayOfWeek } = dateFormatters;

const CustomPointLayer = ({
  currentPoint,
  pointSize,
  pointBorderWidth,
  ...props
}: CustomPointLayerProps) => {
  if (!currentPoint) {
    return;
  }

  const point = currentPoint;

  return (
    <g>
      <DotsItem
        key={point.id}
        x={point.x}
        y={point.y}
        color={point.color}
        borderColor={point.borderColor}
        datum={point.data}
        size={pointSize || 0}
        borderWidth={pointBorderWidth || 0}
        {...props}
      />
    </g>
  );
};

const tickValues = [0, 20, 40, 60, 80, 100];

export const defaults: Omit<LineProps, 'data'> = {
  margin: { top: 28, right: 50, bottom: 50, left: 5 },
  xScale: { type: 'time', format: '%L', precision: 'day' },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false,
    reverse: false,
  },
  axisRight: {
    tickSize: 0,
    tickPadding: 10,
    tickRotation: 0,
    tickValues,
    format: (tick) => `${tick}%`,
    legend: '',
    legendOffset: 0,
  },
  axisBottom: {
    tickSize: 0,
    tickPadding: 30,
    tickRotation: 0,
    legend: '',
    tickValues: 'every day',
    format: formatDayOfWeek,
  },
  pointColor: { from: 'color', modifiers: [] },
  pointBorderColor: { from: 'color', modifiers: [] },
  legends: [],
  gridYValues: tickValues,
  layers: [
    'grid',
    'markers',
    'axes',
    'areas',
    'crosshair',
    'lines',
    CustomPointLayer,
    'slices',
    'mesh',
    'legends',
  ],
};
