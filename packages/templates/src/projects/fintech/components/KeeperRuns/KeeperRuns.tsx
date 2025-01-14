import { useCallback, useState } from 'react';
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
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
import { KeeperRunsTooltipContentProps } from './components/KeeperRunsTooltipContent/types';
import { getKeeperRunsInfo } from './helpers';
import { KeeperRunsProps } from './types';
import { useChartInfo } from './hooks';
import { KeeperRunsTooltipContent } from './components';

export const KeeperRuns = ({ data, period, onClick }: KeeperRunsProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig({
    titleTranslationKey: 'keeperRuns.title',
  });
  const { isFullscreenMode } = useAppLayout();
  const { timestampList, timestampFormatForHint } = useTimestamp({
    data,
  });
  const { failures, serviceOperations, barGroupGap } = useChartInfo({
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
    useState<KeeperRunsTooltipContentProps>({ event: null, data: null });

  const handleHover = useCallback(
    (event: Readonly<Plotly.PlotMouseEvent>) => {
      const date = `${event.points[0].x}`;
      const keeperRunsInfo = getKeeperRunsInfo(date, data);
      setTooltipContentState({ event, data: keeperRunsInfo });
      handlePlotHover(event);
    },
    [data, handlePlotHover],
  );

  return (
    <PlotlyGraphWrapper
      ref={containerRef}
      css={{
        gridArea: 'keeper-runs',
      }}
      onClick={onClick}>
      <Plot
        divId={'keeper-runs-plotly-graph'}
        onHover={handleHover}
        onUnhover={handlePlotUnhover}
        onClick={handlePlotClick}
        data={[
          {
            type: 'bar',
            x: timestampList,
            y: failures,
            yaxis: 'y',
            marker: {
              color: theme.colors.red,
            },
            hoverinfo: 'none',
          },
          {
            type: 'bar',
            x: timestampList,
            y: serviceOperations,
            yaxis: 'y',
            marker: {
              color: theme.colors.yellowLighter,
            },
            hoverinfo: 'none',
          },
        ]}
        layout={{
          ...plotlyDefaultLayoutConfig.layout,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          barmode: 'relative',
          bargroupgap: barGroupGap,
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
              text: t('keeperRuns.number'),
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
          <KeeperRunsTooltipContent {...tooltipContentState} />
        </PlotTooltip>
      )}
    </PlotlyGraphWrapper>
  );
};

export const KeeperRunsWithLoader = ({
  isFetching,
  ...props
}: KeeperRunsProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'keeperRuns.title'}
    css={{ gridArea: 'keeper-runs' }}
    isFetching={isFetching}>
    <KeeperRuns {...props} />
  </WithWidgetLoader>
);
