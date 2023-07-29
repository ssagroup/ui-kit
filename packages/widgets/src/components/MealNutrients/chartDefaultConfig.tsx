import { Layer } from '@nivo/line';
import { DotsItem, useTheme as useNivoTheme } from '@nivo/core';

import { dateFormatters } from '@ssa-ui-kit/utils';

import { ScaleSpec, CustomPointLayerProps } from './types';

const { formatDayOfWeek } = dateFormatters;

const CustomPointLayer = ({
  currentPoint,
  pointSize,
  pointBorderWidth,
  ...props
}: CustomPointLayerProps) => {
  const theme = useNivoTheme();

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
        theme={theme}
        size={pointSize || 0}
        borderWidth={pointBorderWidth || 0}
        {...props}
      />
    </g>
  );
};

const tickValues = [0, 20, 40, 60, 80, 100];

export const defaults = {
  margin: { top: 28, right: 50, bottom: 50, left: 5 },
  xScale: { type: 'time', format: '%L', precision: 'day' } as ScaleSpec,
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false,
    reverse: false,
  } as ScaleSpec,
  axisRight: {
    orient: 'right',
    tickSize: 0,
    tickPadding: 10,
    tickRotation: 0,
    tickValues,
    format: (tick) => `${tick}%`,
    legend: '',
    legendOffset: 0,
  },
  axisBottom: {
    orient: 'bottom',
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
  ] as Layer[],
};
