import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import {
  useBarGroupGap,
  usePlotlyDefaultConfig,
  useTimestamp,
} from '@trading/hooks';
import { useAppLayout } from '@trading/pages/AppLayout/useAppLayoutContext';
import { OrderProps } from './types';
import { PlotlyGraphWrapper, WithWidgetLoader } from '..';
import {
  SHORT_DATE_FORMAT,
  SHORT_TIME_FORMAT,
} from '../DoublePriceChart/constants';
import { isShortPeriod } from '@trading/utils';

export const Orders = ({ data: originalData, period, onClick }: OrderProps) => {
  const theme = useTheme();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'orders.title',
  });
  const bargroupgap = useBarGroupGap(originalData);
  const { t } = useTranslation();
  const { isFullscreenMode } = useAppLayout();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data: originalData,
  });

  const matchedOrdersList: Array<number> = [];
  const allOrdersList: Array<number> = [];

  originalData.forEach(({ allOrders, matchedOrders }) => {
    matchedOrdersList.push(matchedOrders);
    allOrdersList.push(allOrders);
  });

  return (
    <PlotlyGraphWrapper
      css={{
        gridArea: 'orders',
      }}
      onClick={onClick}>
      <Plot
        divId={'orders-plotly-graph'}
        data={[
          {
            type: 'bar',
            x: timestampList,
            y: allOrdersList,
            yaxis: 'y',
            name: t('orders.all'),
            marker: {
              color: theme.colors.greyFocused,
            },
            hovertemplate:
              `<b>${t('orders.all')}: %{y:}</b>` + '<extra></extra>',
          },
          {
            type: 'bar',
            x: timestampList,
            y: matchedOrdersList,
            yaxis: 'y',
            name: t('orders.matched'),
            marker: {
              color: theme.colors.purpleDark,
            },
            hovertemplate:
              `<b>${t('orders.matched')}: %{y:}</b>` + '<extra></extra>',
          },
        ]}
        layout={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap,
          barmode: 'overlay',
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
              text: t('orders.number'),
            },
          ],
          title: {
            ...(plotlyDefaultLayoutConfig.layout.title as object),
            x: 0.015,
          },
          margin: {
            ...plotlyDefaultLayoutConfig.layout.margin,
            l: 15,
          },
        }}
        config={{ ...plotlyDefaultLayoutConfig.config }}
      />
    </PlotlyGraphWrapper>
  );
};

export const OrdersWithLoader = ({
  isFetching,
  ...props
}: OrderProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'orders.title'}
    css={{ gridArea: 'orders' }}
    isFetching={isFetching}>
    <Orders {...props} />
  </WithWidgetLoader>
);
