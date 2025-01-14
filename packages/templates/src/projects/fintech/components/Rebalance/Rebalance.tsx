import { useCallback, useState } from 'react';
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { usePlotlyDefaultConfig, useTimestamp } from '@fintech/hooks';
import { useAppLayout } from '@fintech/pages/AppLayout/useAppLayoutContext';
import { isShortPeriod } from '@fintech/utils';
import {
  PlotlyGraphWrapper,
  PlotTooltip,
  WithWidgetLoader,
} from '@fintech/components';
import { usePlotTooltip } from '@fintech/components/PlotTooltip/hooks';
import {
  SHORT_DATE_FORMAT,
  SHORT_TIME_FORMAT,
} from '@fintech/components/DoublePriceChart/constants';
import { RebalanceTooltipContent } from './components';
import { RebalanceProps } from './types';
import { useChartInfo } from './hooks';
import { getRebalancingInfo } from './helpers';
import { RebalanceTooltipContentProps } from './components/RebalanceTooltipContent/types';

export const Rebalance = ({
  data,
  currency,
  period,
  onClick,
}: RebalanceProps) => {
  const theme = useTheme();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'rebalance.title',
  });
  const { isFullscreenMode } = useAppLayout();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data,
  });
  const { bought, sold, bargroupgap, rebalanceData } = useChartInfo({
    dataOriginal: data,
  });
  const {
    tooltipProps,
    tooltipRef,
    containerRef,
    handlePlotHover,
    handlePlotClick,
    handlePlotUnhover,
  } = usePlotTooltip();

  const [tooltipContentState, setTooltipContentState] =
    useState<RebalanceTooltipContentProps>({ event: null, data: null });

  const handleHover = useCallback(
    (event: Readonly<Plotly.PlotMouseEvent>) => {
      const date = `${event.points[0].x}`;
      const rebalancingInfo = getRebalancingInfo(date, data);
      setTooltipContentState({ event, data: rebalancingInfo });
      handlePlotHover(event);
    },
    [data, handlePlotHover],
  );

  return (
    <PlotlyGraphWrapper
      ref={containerRef}
      css={{
        gridArea: 'rebalancing',
      }}
      onClick={onClick}>
      <Plot
        divId={'rebalance-plotly-graph'}
        onHover={handleHover}
        onUnhover={handlePlotUnhover}
        onClick={handlePlotClick}
        data={[
          {
            type: 'bar',
            x: timestampList,
            y: bought.original,
            yaxis: 'y',
            marker: {
              color: theme.colors.green,
            },
            customdata: ['buy'],
            hoverinfo: 'none',
          },
          {
            type: 'bar',
            x: timestampList,
            y: sold.original,
            yaxis: 'y',
            marker: {
              color: theme.colors.red,
            },
            customdata: ['sell'],
            hoverinfo: 'none',
          },
        ]}
        layout={{
          ...plotlyDefaultLayoutConfig.layout,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          barmode: 'relative',
          bargroupgap,
          hovermode: 'closest',
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
              text:
                rebalanceData == null || rebalanceData.length === 0
                  ? undefined
                  : currency,
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
      {tooltipProps.visible && (
        <PlotTooltip ref={tooltipRef} {...tooltipProps}>
          <RebalanceTooltipContent {...tooltipContentState} />
        </PlotTooltip>
      )}
    </PlotlyGraphWrapper>
  );
};

export const RebalanceWithLoader = ({
  isFetching,
  ...props
}: RebalanceProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'rebalance.title'}
    css={{ gridArea: 'rebalancing' }}
    isFetching={isFetching}>
    <Rebalance {...props} />
  </WithWidgetLoader>
);
