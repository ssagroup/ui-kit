import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { SimpleChartTooltip } from '@ssa-ui-kit/core';

import { getTime } from './utils';

// ScaleSpec is not exported from @nivo/line
type ScaleSpec = LineSvgProps['xScale'];

const defaults = {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  xScale: { type: 'point' } as ScaleSpec,
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: true,
    reverse: false,
  } as ScaleSpec,
  pointBorderColor: { from: 'serieColor' },
  legends: [],
  xFormat: (yVal) => getTime(new Date(yVal)),
  yFormat: (xVal) => `${xVal} bpm`,
  tooltip: (args) => <SimpleChartTooltip {...args} />,
};

export const HeartRateLineChart = ({ data, ...props }: LineSvgProps) => {
  return (
    <ResponsiveLine
      data={data}
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      lineWidth={1}
      enablePoints={false}
      pointSize={3}
      pointColor="black"
      pointBorderWidth={2}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.1}
      enableCrosshair={false}
      crosshairType="top-left"
      useMesh={true}
      animate={false}
      {...defaults}
      {...props}
    />
  );
};
