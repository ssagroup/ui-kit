import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { WithWidgetCard } from '@components/WidgetCard';
import { BarLineComplexChartProps } from './types';
import { PieChartHeader } from '../PieChart/PieChartHeader';
import { usePlotlyDefaultConfig } from '../hooks';
import { useChartInfo } from './useChartInfo';
import { BarLineComplexChartTooltip } from './BarLineComplexChartTooltip';

export const BarLineComplexChartInternal = ({
  features = ['header'],
  cardProps,
  width = '670px',
  height = '220px',
  ...props
}: Omit<
  BarLineComplexChartProps,
  'data' | 'lineShape' | 'maxVisibleBars' | 'maxVisibleLines'
>) => {
  const theme = useTheme();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig();
  const { transformedChartData, tooltipContentRef } = useChartInfo();
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
        css={{ width, maxWidth: '100%', height: `calc(${height} - 50px)` }}
        data={transformedChartData}
        layout={{
          margin: {
            b: 0,
            l: 0,
            r: 30,
            t: 20,
            pad: 10,
          },
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
        config={{
          ...plotlyDefaultLayoutConfig.config,
          modeBarButtons: [
            //     [
            //       {
            //         name: 'filtering',
            //         icon: {
            //           svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            // <path d="M2.73438 2.5C2.605 2.5 2.5 2.605 2.5 2.73438V4.60938C2.5 4.66281 2.51846 4.71461 2.55127 4.75586L8.125 11.723V15.9116C8.125 16.0067 8.182 16.0915 8.26965 16.1276L11.5509 17.4826C11.58 17.4943 11.6106 17.5 11.6406 17.5C11.6866 17.5 11.7313 17.4864 11.7706 17.4606C11.8358 17.417 11.875 17.3439 11.875 17.2656V11.723L17.4487 4.75586C17.4815 4.71461 17.5 4.66281 17.5 4.60938V2.73438C17.5 2.605 17.395 2.5 17.2656 2.5H2.73438ZM2.96875 2.96875H17.0312V4.52698L11.528 11.4062H8.47198L2.96875 4.52698V2.96875ZM8.59375 11.875H11.4062V16.9159L8.59375 15.755V11.875Z" fill="#2B2D31" fill-opacity="0.6"/>
            // <path fill-rule="evenodd" clip-rule="evenodd" d="M2.73438 2.25C2.46693 2.25 2.25 2.46693 2.25 2.73438V4.60938C2.25 4.7201 2.28853 4.82714 2.35605 4.91203L7.875 11.8107V15.6701C7.875 15.6701 7.86214 16.0606 7.91666 16.1667C7.98574 16.3011 8.17447 16.3588 8.17447 16.3588L11.4555 17.7137L11.4574 17.7145C11.5169 17.7385 11.5794 17.75 11.6406 17.75C11.7368 17.75 11.8288 17.7214 11.9076 17.6698L11.9096 17.6684C12.0438 17.5786 12.125 17.4277 12.125 17.2656V11.8107L17.6444 4.91149C17.7119 4.8266 17.75 4.7201 17.75 4.60938V2.73438C17.75 2.46693 17.5331 2.25 17.2656 2.25H2.73438ZM16.7812 3.21875H3.21875V4.43928L8.59214 11.1562H11.4079L16.7812 4.43928V3.21875ZM8.84375 12.125V15.5877L11.1562 16.5422V12.125H8.84375Z" fill="#2B2D31" fill-opacity="0.6"/>
            // </svg>`,
            //         },
            //         title: 'Filtering',
            //         click: handleFilterClick,
            //         attr: 'filtering-icon',
            //         gravity: '1',
            //       },
            //     ],
            [
              'zoom2d',
              'pan2d',
              'select2d',
              'zoomIn2d',
              'zoomOut2d',
              'autoScale2d',
              'resetScale2d',
            ],
          ],
        }}
        {...props}
      />
      <BarLineComplexChartTooltip ref={tooltipContentRef} />
    </WithWidgetCard>
  );
};
