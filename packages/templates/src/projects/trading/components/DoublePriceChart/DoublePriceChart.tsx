/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTheme } from '@emotion/react';
import Plot from 'react-plotly.js';
import { useTranslation } from 'react-i18next';
import {
  useBarGroupGap,
  usePlotlyDefaultConfig,
  useTimestamp,
} from '@trading/hooks';
import { useCurrency } from '@trading/contexts';
import { useAppLayout } from '@trading/pages/AppLayout/useAppLayoutContext';
import { useBotInfo } from '@trading/pages/BotPage/hooks';
import { SHORT_DATE_FORMAT, SHORT_TIME_FORMAT } from './constants';
import { useChartInfo } from './hooks';
import { DoublePriceChartProps } from './types';
import { COMMON_ANNOTATION } from '../WeightedAveragePrice/constants';
import { PlotlyGraphWrapper, WithWidgetLoader } from '..';
import { isShortPeriod } from '@trading/utils';

export const DoublePriceChart = ({
  data: dataOriginal,
  period,
  aggregationPeriod,
  onClick,
}: DoublePriceChartProps) => {
  const theme = useTheme();
  const bargroupgap = useBarGroupGap(dataOriginal);
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const { isFullscreenMode } = useAppLayout();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'balanceVsPrice.title',
  });

  const { botAccountBalance, baseAssetPrice, noData } = useChartInfo({
    dataOriginal,
  });
  const {
    data: { baseCurrency },
  } = useBotInfo();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data: dataOriginal,
    aggregationPeriod,
  });

  return (
    <PlotlyGraphWrapper
      css={{
        gridArea: 'double-price-bar-chart',
      }}
      onClick={onClick}>
      {/* @ts-ignore */}
      <Plot
        divId={'balance-vs-price-plotly-graph'}
        data={[
          {
            type: 'bar',
            name: t('balanceVsPrice.accountBalance'),
            x: timestampList,
            y: botAccountBalance.original,
            yaxis: 'y',
            marker: {
              color: theme.colors.greyFocused,
            },
            hovertemplate:
              `<b>${t(
                'balanceVsPrice.tooltip.balance',
              )}:</b> %{y:} ${currency}` + '<extra></extra>',
          },
          {
            ...plotlyDefaultLayoutConfig.emptyBar,
            x: timestampList,
            y: noData,
          },
          {
            x: timestampList,
            y: baseAssetPrice.original,
            type: 'scatter',
            name: `${t('balanceVsPrice.priceOf')} ${baseCurrency}`,
            yaxis: 'y2',
            mode: 'lines',
            line: {
              shape: 'spline',
            },
            marker: { color: theme.colors.pinkLighter, size: 4 },
            hovertemplate:
              `<b>${t('balanceVsPrice.tooltip.price')}:</b> %{y:} ${currency}` +
              '<extra></extra>',
          },
        ]}
        layout={{
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap,
          yaxis: {
            showgrid: true,
            rangemode: 'normal',
            range: [
              botAccountBalance.minWithStep,
              botAccountBalance.maxWithStep,
            ],
            zeroline: false,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            range: [baseAssetPrice.minWithStep, baseAssetPrice.maxWithStep],
            tickfont: {
              color: theme.colors.pink,
            },
            zeroline: false,
          },
          xaxis: {
            showgrid: true,
            tickformat: isShortPeriod(period)
              ? SHORT_TIME_FORMAT
              : SHORT_DATE_FORMAT,
            hoverformat: timestampFormatForHint,
            zeroline: false,
          },
          legend: {
            orientation: 'h',
            yanchor: 'auto',
            xanchor: 'auto',
            valign: 'middle',
            y: isFullscreenMode ? undefined : -0.5,
            x: 0.5,
          },
          ...plotlyDefaultLayoutConfig.layout,
          annotations: [
            {
              ...COMMON_ANNOTATION,
              yshift: isFullscreenMode ? 50 : 37,
              text: currency,
            },
            {
              ...COMMON_ANNOTATION,
              yshift: isFullscreenMode ? 50 : 37,
              x: 1,
              xshift: 35,
              xanchor: 'right',
              text: currency,
            },
          ],
        }}
        {...plotlyDefaultLayoutConfig.config}
      />
    </PlotlyGraphWrapper>
  );
};

export const DoublePriceChartWithLoader = ({
  isFetching,
  ...props
}: DoublePriceChartProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'balanceVsPrice.title'}
    css={{ gridArea: 'double-price-bar-chart' }}
    isFetching={isFetching}>
    <DoublePriceChart {...props} />
  </WithWidgetLoader>
);
