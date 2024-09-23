import Plot from 'react-plotly.js';
import {
  useBarGroupGap,
  usePlotlyDefaultConfig,
  useTimestamp,
} from '@trading/hooks';
import { isShortPeriod } from '@trading/utils';
import { useAppLayout } from '@trading/pages/AppLayout/useAppLayoutContext';
import { TurnoverProps } from './types';
import {
  SHORT_DATE_FORMAT,
  SHORT_TIME_FORMAT,
} from '../DoublePriceChart/constants';
import { PlotlyGraphWrapper, WithWidgetLoader } from '..';

export const Turnover = ({
  data,
  currency,
  period,
  onClick,
}: TurnoverProps) => {
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'turnover.title',
  });
  const bargroupgap = useBarGroupGap(data);
  const turnoverData: Array<number | null> = data.map((item) => item.turnover);

  const { isFullscreenMode } = useAppLayout();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data,
  });

  return (
    <PlotlyGraphWrapper
      css={{
        gridArea: 'turnover',
      }}
      onClick={onClick}>
      <Plot
        divId="turnover-plotly-graph"
        data={[
          {
            type: 'bar',
            x: timestampList,
            y: turnoverData,
            yaxis: 'y',
            showlegend: false,
            marker: {
              color: '#47ACD8',
            },
            hovertemplate: `%{y:} ${currency}` + '<extra></extra>',
          },
        ]}
        layout={{
          ...plotlyDefaultLayoutConfig.layout,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap,
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
            b: 10,
            l: 15,
          },
          showlegend: false,
        }}
        config={{ ...plotlyDefaultLayoutConfig.config }}
      />
    </PlotlyGraphWrapper>
  );
};

export const TurnoverWithLoader = ({
  isFetching,
  ...props
}: TurnoverProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'turnover.title'}
    css={{ gridArea: 'turnover' }}
    isFetching={isFetching}>
    <Turnover {...props} />
  </WithWidgetLoader>
);
