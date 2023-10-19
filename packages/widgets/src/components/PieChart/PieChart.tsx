import { ResponsivePie } from '@nivo/pie';
import { PieChartProps } from './types';

import { PieChartBase, PieChartTextBase } from './PieChartBases';
import { PieChartLegend } from './PieChartLegend';

const mockResponse = [
  {
    // cspell:disable-next-line
    id: 'XlyNrZpVvNp2Z9LqloS6',
    color: 'rgba(117, 153, 222, 1)',
    colorTag: 'blueLight',
    date: '2023-05-03T23:00:00.000Z',
    value: 88,
    label: 'stretching',
  },
  {
    // cspell:disable-next-line
    id: 'YthvgItFS3W0Sa3mRW0X',
    color: 'rgba(65, 187, 187, 1)',
    colorTag: 'turquoise',
    date: '2023-05-03T23:00:00.000Z',
    value: 55,
    label: 'cardio',
  },
];

export const PieChart = ({
  as,
  className,
  showLegend = true,
  title,
}: PieChartProps) => {
  return (
    <PieChartBase as={as} className={className}>
      <div className="pie-chart-wrapper">
        <ResponsivePie
          data={mockResponse}
          isInteractive={false}
          innerRadius={0.8}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          padAngle={2}
          cornerRadius={16}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          layers={['arcs']}
        />
        {title && <PieChartTextBase>{title}</PieChartTextBase>}
      </div>
      {showLegend && <PieChartLegend data={mockResponse} />}
    </PieChartBase>
  );
};
