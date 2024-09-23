import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { usePlotlyDefaultConfig, useTimestamp } from '@trading/hooks';
import { isShortPeriod } from '@trading/utils';
import { useAppLayout } from '@trading/pages/AppLayout/useAppLayoutContext';
import { CumulativePNLProps } from './types';
import {
  SHORT_DATE_FORMAT,
  SHORT_TIME_FORMAT,
} from '../DoublePriceChart/constants';
import { PlotlyGraphWrapper, WithWidgetLoader } from '..';

export const CumulativePNL = ({
  data,
  currency,
  period,
  onClick,
}: CumulativePNLProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'cumulative-pnl.title',
  });
  const { isFullscreenMode } = useAppLayout();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data,
  });
  const cumulativePNLList = data.map(({ cumulativePNL }) => cumulativePNL);
  const cumulativePNLInvestmentList = data.map(
    ({ cumulativePnlInvestment }) => cumulativePnlInvestment,
  );
  const cumulativePNLTotalList = data.map(
    ({ cumulativePnlTotal }) => cumulativePnlTotal,
  );

  return (
    <PlotlyGraphWrapper
      css={{
        gridArea: 'cumulative',
      }}
      onClick={onClick}>
      <Plot
        divId={'cumulative-pnl-plotly-graph'}
        data={[
          {
            type: 'scatter',
            x: timestampList,
            y: cumulativePNLList,
            yaxis: 'y',
            mode: 'lines',
            name: t('cumulative-pnl.tradingText'),
            line: {
              shape: 'spline',
            },
            marker: {
              color: theme.colors.purpleDark,
            },
            hovertemplate:
              `<b>${t('cumulative-pnl.tradingText')}:</b> %{y:} ${currency}` +
              '<extra></extra>',
          },
          {
            type: 'scatter',
            x: timestampList,
            y: cumulativePNLInvestmentList,
            yaxis: 'y',
            mode: 'lines',
            name: t('cumulative-pnl.investmentText'),
            line: {
              shape: 'spline',
            },
            marker: {
              color: theme.colors.yellow,
            },
            hovertemplate:
              `<b>${t(
                'cumulative-pnl.investmentText',
              )}:</b> %{y:} ${currency}` + '<extra></extra>',
          },
          {
            type: 'scatter',
            x: timestampList,
            y: cumulativePNLTotalList,
            yaxis: 'y',
            mode: 'lines',
            name: t('cumulative-pnl.totalText'),
            line: {
              shape: 'spline',
            },
            marker: {
              color: theme.colors.blueLight,
            },
            hovertemplate:
              `<b>${t('cumulative-pnl.totalText')}:</b> %{y:} ${currency}` +
              '<extra></extra>',
          },
        ]}
        layout={{
          hovermode: 'x unified',
          yaxis: {
            showgrid: true,
            side: 'right',
            zeroline: false,
            automargin: true,
          },
          xaxis: {
            showgrid: true,
            tickformat: isShortPeriod(period)
              ? SHORT_TIME_FORMAT
              : SHORT_DATE_FORMAT,
            hoverformat: timestampFormatForHint,
            zeroline: false,
            automargin: true,
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
              xref: 'paper',
              yref: 'paper',
              x: 1,
              xanchor: 'right',
              y: 1,
              yanchor: 'top',
              xshift: 35,
              showarrow: false,
              yshift: isFullscreenMode ? 50 : 37,
              text: currency,
            },
          ],
          title: {
            ...(plotlyDefaultLayoutConfig.layout.title as object),
            x: 0.015,
          },
          margin: {
            ...plotlyDefaultLayoutConfig.layout.margin,
            l: 25,
            b: 10,
          },
        }}
        config={{ ...plotlyDefaultLayoutConfig.config }}
      />
    </PlotlyGraphWrapper>
  );
};

export const CumulativePNLWithLoader = ({
  isFetching,
  ...props
}: CumulativePNLProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'cumulative-pnl.title'}
    css={{ gridArea: 'cumulative' }}
    isFetching={isFetching}>
    <CumulativePNL {...props} />
  </WithWidgetLoader>
);
