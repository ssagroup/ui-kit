import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { WithWidgetCard } from '@components/WidgetCard';
import { PieChartHeader } from '../PieChart/PieChartHeader';
import { BarLineComplexChartProps } from './types';
import { useChartInfo } from './useChartInfo';
import { usePlotlyDefaultConfig } from '../hooks';

export const BarLineComplexChart = ({
  features = ['header'],
  cardProps,
  // chartConfig,
  data: chartData,
  width = '670px',
  height = '220px',
  ...props
}: BarLineComplexChartProps) => {
  // TODO: make filtering
  // const showBars = propOr<ChartConfig, boolean>(true, 'showBars')(
  //   chartData,
  // );

  // TODO: make filtering
  // const showLines = propOr<ChartConfig, boolean>(true, 'showLines')(
  //   chartData,
  // );
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig();
  const { transformedChartData } = useChartInfo({ data: chartData });
  const theme = useTheme();
  // const { xLabels } = useChartInfo(chartData);
  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        headerContent: <PieChartHeader features={features} />,
        width,
        height,
        ...cardProps,
      }}>
      <Plot
        divId={'bar-line-complex-chart-graph'}
        css={{ width, height: `calc(${height} - 36px)` }}
        data={transformedChartData}
        layout={{
          barmode: 'group',
          autosize: false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap: 0.2,
          yaxis: {
            showgrid: true,
            rangemode: 'nonnegative',
            zeroline: false,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            tickfont: {
              color: theme.colors.greyDarker60,
            },
            zeroline: false,
          },
          xaxis: {
            showgrid: true,
            type: 'date',
            hoverformat: '%B',
            tickformat: '%b',
            zeroline: false,
            dtick: 31 * 24 * 60 * 60 * 1000,
          },
          legend: {
            orientation: 'h',
            yanchor: 'top',
            xanchor: 'center',
            valign: 'bottom',
            itemclick: 'toggle',
            bgcolor: 'rgba(255, 255, 255, 0)',
            y: -0.22,
            x: 0.5,
          },
          ...plotlyDefaultLayoutConfig.layout,
        }}
        {...plotlyDefaultLayoutConfig.config}
        {...props}
      />
    </WithWidgetCard>
  );
};
