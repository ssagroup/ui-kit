/* eslint-disable @typescript-eslint/ban-ts-comment */
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import { useAppLayout } from '@fintech/pages/AppLayout/useAppLayoutContext';
import { useBotInfo } from '@fintech/pages/BotPage/hooks';
import {
  useBarGroupGap,
  useDeviceType,
  usePlotlyDefaultConfig,
  useTimestamp,
} from '@fintech/hooks';
import { isShortPeriod } from '@fintech/utils';
import { useCurrency } from '@fintech/contexts';
import { WeightedAveragePriceProps } from './types';
import { useChartInfo } from './hooks';
import { COLORS, GRID_AREA_NAME, COMMON_ANNOTATION } from './constants';
import { PlotlyGraphWrapper, WithWidgetLoader } from '..';
import {
  SHORT_DATE_FORMAT,
  SHORT_TIME_FORMAT,
} from '../DoublePriceChart/constants';

export const WeightedAveragePrice = ({
  data: dataOriginal,
  period,
  onClick,
}: WeightedAveragePriceProps) => {
  const theme = useTheme();
  const bargroupgap = useBarGroupGap(dataOriginal.data);
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const deviceType = useDeviceType();
  const { isFullscreenMode } = useAppLayout();
  const { aggregationPeriod } = dataOriginal;

  const {
    baseAssetMarketPrice,
    baseAssetWeightedMeanPrice,
    baseCoinPrice,
    baseCoinCount,
    quoteCoinCount,
    noData,
  } = useChartInfo({ dataOriginal });
  const {
    data: { baseCurrency, quoteCurrency },
  } = useBotInfo();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'weightedAveragePrice.title',
  });

  const { timestampList, timestampFormatForHint } = useTimestamp({
    data: dataOriginal.data,
    aggregationPeriod,
  });

  return (
    <PlotlyGraphWrapper
      css={{
        gridArea: GRID_AREA_NAME,
      }}
      onClick={onClick}>
      {/* @ts-ignore */}
      <Plot
        data={[
          {
            type: 'bar',
            name: t('weightedAveragePrice.tooltip.baseBalance'),
            x: timestampList,
            y: baseCoinPrice.original,
            customdata: baseCoinCount.original,
            yaxis: 'y',
            marker: {
              color: theme.colors.blue,
            },
            hovertemplate:
              `<b>${t(
                'weightedAveragePrice.tooltip.baseBalance',
              )}:</b> %{customdata} ${baseCurrency} (%{y:} ${quoteCurrency})` +
              '<extra></extra>',
          },
          {
            type: 'bar',
            name: t('weightedAveragePrice.tooltip.quoteBalance'),
            x: timestampList,
            y: quoteCoinCount.original,
            yaxis: 'y',
            marker: {
              color: theme.colors.green,
            },
            hovertemplate:
              `<b>${t(
                'weightedAveragePrice.tooltip.quoteBalance',
              )}:</b> %{y:} ${quoteCurrency}` + '<extra></extra>',
          },
          {
            ...plotlyDefaultLayoutConfig.emptyBar,
            yaxis: 'y',
            x: timestampList,
            y: noData,
          },
          {
            x: timestampList,
            y: baseAssetWeightedMeanPrice.original,
            type: 'scatter',
            name: t('weightedAveragePrice.tooltip.weightedMeanAssetPrice'),
            yaxis: 'y2',
            mode: 'lines',
            connectgaps: true,
            line: {
              shape: 'spline',
              smoothing: true,
            },
            marker: {
              color: theme.colors[COLORS['baseAssetWeightedMeanPrice']],
              size: 4,
            },
            hovertemplate:
              `<b>${t(
                'weightedAveragePrice.tooltip.weightedMeanAssetPrice',
              )}:</b> %{y:} ${quoteCurrency}` + '<extra></extra>',
          },
          {
            x: timestampList,
            y: baseAssetMarketPrice.original,
            type: 'scatter',
            name: t('weightedAveragePrice.tooltip.priceOfBase'),
            yaxis: 'y2',
            mode: 'lines',
            connectgaps: true,
            // showlegend: false,
            line: {
              shape: 'spline',
              smoothing: true,
            },
            marker: {
              color: theme.colors[COLORS['baseAssetMarketPrice']],
              size: 4,
            },
            hovertemplate:
              `<b>${t(
                'weightedAveragePrice.tooltip.priceOfBase',
              )}:</b> %{y:} ${quoteCurrency}` + '<extra></extra>',
          },
        ]}
        layout={{
          barmode: 'stack',
          bargroupgap,
          annotations: [
            {
              ...COMMON_ANNOTATION,
              text: currency,
              yshift: isFullscreenMode ? 50 : 37,
            },
            {
              ...COMMON_ANNOTATION,
              x: 1,
              xshift: 35,
              xanchor: 'right',
              yshift: isFullscreenMode ? 50 : 37,
              text: currency,
            },
          ],
          // @ts-ignore
          barcornerradius: 15,
          yaxis: {
            showgrid: true,
            zeroline: false,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            tickfont: {
              color: theme.colors.pink,
            },
            zeroline: false,
          },
          xaxis: {
            type: 'date',
            showgrid: true,
            tickformat: isShortPeriod(period)
              ? SHORT_TIME_FORMAT
              : SHORT_DATE_FORMAT,
            hoverformat: timestampFormatForHint,
            zeroline: true,
          },
          legend: {
            orientation: 'h',
            bgcolor: 'rgba(255, 255, 255, 0)',
            yanchor: 'auto',
            xanchor: 'auto',
            valign: 'middle',
            traceorder: 'normal',
            font: {
              size: ['mobile', 'md'].includes(deviceType) ? 7 : 10,
            },
            y: isFullscreenMode
              ? undefined
              : ['mobile', 'md'].includes(deviceType)
                ? -0.7
                : -0.5,
            x: 0.5,
          },
          ...plotlyDefaultLayoutConfig.layout,
        }}
        {...plotlyDefaultLayoutConfig.config}
      />
    </PlotlyGraphWrapper>
  );
};

export const WeightedAveragePriceWithLoader = ({
  isFetching,
  ...props
}: WeightedAveragePriceProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'weightedAveragePrice.title'}
    css={{ gridArea: GRID_AREA_NAME }}
    isFetching={isFetching}>
    <WeightedAveragePrice {...props} />
  </WithWidgetLoader>
);
