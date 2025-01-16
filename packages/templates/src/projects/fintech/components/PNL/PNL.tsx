import Plot from 'react-plotly.js';
import { useTranslation } from '@contexts';
import {
  useBarGroupGap,
  usePlotlyDefaultConfig,
  useTimestamp,
} from '@fintech/hooks';
import { useAppLayout } from '@fintech/pages/AppLayout/useAppLayoutContext';
import { isShortPeriod } from '@fintech/utils';
import { PNLProps } from './types';
import { PlotlyGraphWrapper, WithWidgetLoader } from '..';
import {
  SHORT_DATE_FORMAT,
  SHORT_TIME_FORMAT,
} from '../DoublePriceChart/constants';

export const PNL = ({
  data: originalData,
  currency,
  period,
  onClick,
}: PNLProps) => {
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'pnl.title',
  });
  const bargroupgap = useBarGroupGap(originalData);
  const { t } = useTranslation();
  const { isFullscreenMode } = useAppLayout();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data: originalData,
  });
  const pnlList = originalData.map(({ pnl }) => pnl);
  const pnlInvestmentList = originalData.map(
    ({ pnlInvestment }) => pnlInvestment,
  );
  const pnlTotalList = originalData.map(({ pnlTotal }) => pnlTotal);
  const colorsList = originalData.map(({ pnlTotal }) =>
    pnlTotal < 0 ? '#F44949' : '#0B9F43',
  );
  const start =
    timestampList && timestampList.length > 0 && timestampList[0]
      ? Date.parse(timestampList[0] as string)
      : 0;
  const end =
    timestampList &&
    timestampList.length > 0 &&
    timestampList[timestampList.length - 1]
      ? Date.parse(timestampList[timestampList.length - 1] as string)
      : 0;
  const width =
    ((end - start) / timestampList.length) *
    (1 - bargroupgap) *
    (timestampList.length > 7 ? 0.4 : 0.5);

  return (
    <PlotlyGraphWrapper
      css={{
        gridArea: 'pnl',
      }}
      onClick={onClick}>
      <Plot
        divId={'pnl-plotly-graph'}
        data={
          [
            {
              type: 'bar',
              x: timestampList,
              y: pnlList,
              yaxis: 'y',
              name: t('pnl.tradingText'),
              opacity: 0.6,
              marker: {
                color: '#4178E1',
              },
              hovertemplate:
                `<b>${t('pnl.tradingText')}:</b> %{y:} ${currency}` +
                '<extra></extra>',
            },
            {
              type: 'bar',
              x: timestampList,
              y: pnlInvestmentList,
              yaxis: 'y',
              name: t('pnl.investmentText'),
              opacity: 0.6,
              marker: {
                color: '#EDBA5D',
              },
              hovertemplate:
                `<b>${t('pnl.investmentText')}:</b> %{y:} ${currency}` +
                '<extra></extra>',
            },
            {
              type: 'bar',
              x: timestampList,
              y: pnlTotalList,
              yaxis: 'y',
              name: t('pnl.totalText'),
              base: 0,
              width: width,
              marker: {
                cornerradius: 2,
                color: colorsList,
              },
              hovertemplate:
                `<b>${t('pnl.totalText')}:</b> %{y:} ${currency}` +
                '<extra></extra>',
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ] as any
        }
        layout={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap,
          barmode: 'relative',
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
            l: 15,
            b: 10,
          },
        }}
        config={{ ...plotlyDefaultLayoutConfig.config }}
      />
    </PlotlyGraphWrapper>
  );
};

export const PNLWithLoader = ({
  isFetching,
  ...props
}: PNLProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'pnl.title'}
    css={{ gridArea: 'pnl' }}
    isFetching={isFetching}>
    <PNL {...props} />
  </WithWidgetLoader>
);
