import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { WithWidgetCard } from '@components/WidgetCard';
import { PieChartProps } from '../PieChart';
import { PieChartHeader } from '../PieChart/PieChartHeader';
// import { useChartInfo } from './useChartInfo';
import { ChartData } from './types';
import { getColorPalette } from './colorPalette';

// TODO: move to the external file
type BarLineComplexChartProps = Pick<PieChartProps, 'cardProps'> & {
  features?: Array<'header'>;
  chartData: ChartData;
};

// TODO: For stories use title: 'Charts/BarLineComplexChart'
export const BarLineComplexChart = ({
  features = ['header'],
  cardProps,
  chartData,
}: BarLineComplexChartProps) => {
  // TODO: make filtering
  // const showBars = pathOr<ChartData, boolean>(true, ['config', 'showBars'])(
  //   chartData,
  // );

  // TODO: make filtering
  // const showLines = pathOr<ChartData, boolean>(true, ['config', 'showLines'])(
  //   chartData,
  // );
  const theme = useTheme();
  const { pieChartColors } = getColorPalette(theme);
  const transformedChartData = chartData.data.map((item) => {
    const extraParams: Record<string, any> = {
      marker: {
        // TODO: make through the option
        color: pieChartColors,
      },
    };
    if (!('yaxis' in item)) {
      extraParams.yaxis = item.type === 'bar' ? 'y' : 'y2';
    }
    if (item.type === 'scatter') {
      extraParams.mode = 'lines';
      extraParams.line = {
        shape: 'spline',
      };
    }
    return {
      ...item,
      ...extraParams,
    };
  });
  // const { xLabels } = useChartInfo(chartData);
  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        headerContent: <PieChartHeader features={features} />,
        ...cardProps,
      }}>
      <Plot
        divId={'bar-line-complex-chart-graph'}
        // use data from chartData, and transform it additionally
        // adding, for
        // - bar: marker + hovertemplate + yaxis: 'y'
        // - scatter: mode 'lines', yaxis 'y2', line shape 'spline', marker, hovertemplate
        data={transformedChartData}
        // data={[
        //   {
        //     type: 'bar',
        //     name: 'Bar 1',
        //     x: xLabels,
        //     y:
        //   },
        //   {
        //     type: 'bar',
        //     name: t('balanceVsPrice.accountBalance'),
        //     x: xLabels,
        //     y: botAccountBalance.original,
        //     yaxis: 'y',
        //     marker: {
        //       color: theme.colors.greyFocused,
        //     },
        //     hovertemplate:
        //       `<b>${t(
        //         'balanceVsPrice.tooltip.balance',
        //       )}:</b> %{y:} ${currency}` + '<extra></extra>',
        //   },
        //   {
        //     ...plotlyDefaultLayoutConfig.emptyBar,
        //     x: xLabels,
        //     y: noData,
        //   },
        //   {
        //     x: xLabels,
        //     y: baseAssetPrice.original,
        //     type: 'scatter',
        //     name: `${t('balanceVsPrice.priceOf')} ${baseCurrency}`,
        //     yaxis: 'y2',
        //     mode: 'lines',
        //     line: {
        //       shape: 'spline',
        //     },
        //     marker: { color: theme.colors.pinkLighter, size: 4 },
        //     hovertemplate:
        //       `<b>${t('balanceVsPrice.tooltip.price')}:</b> %{y:} ${currency}` +
        //       '<extra></extra>',
        //   },
        // ]}
        layout={{
          barmode: 'group',
          // barcornerradius: 15,
          // bargroupgap,
          yaxis: {
            showgrid: true,
            rangemode: 'normal',
            // range: [
            //   botAccountBalance.minWithStep,
            //   botAccountBalance.maxWithStep,
            // ],
            zeroline: false,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            // range: [baseAssetPrice.minWithStep, baseAssetPrice.maxWithStep],
            tickfont: {
              color: theme.colors.pink,
            },
            zeroline: false,
          },
          xaxis: {
            showgrid: true,
            // tickformat: isShortPeriod(period)
            //   ? SHORT_TIME_FORMAT
            //   : SHORT_DATE_FORMAT,
            // hoverformat: timestampFormatForHint,
            zeroline: false,
          },
          legend: {
            orientation: 'h',
            yanchor: 'auto',
            xanchor: 'auto',
            valign: 'middle',
            // y: isFullscreenMode ? undefined : -0.5,
            x: 0.5,
          },
          // ...plotlyDefaultLayoutConfig.layout,
          // annotations: [
          //   {
          //     ...COMMON_ANNOTATION,
          //     yshift: isFullscreenMode ? 50 : 37,
          //     text: currency,
          //   },
          //   {
          //     ...COMMON_ANNOTATION,
          //     yshift: isFullscreenMode ? 50 : 37,
          //     x: 1,
          //     xshift: 35,
          //     xanchor: 'right',
          //     text: currency,
          //   },
          // ],
        }}
        // {...plotlyDefaultLayoutConfig.config}
      />
    </WithWidgetCard>
  );
};
