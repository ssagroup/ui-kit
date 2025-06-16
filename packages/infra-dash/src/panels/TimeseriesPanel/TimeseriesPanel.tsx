import { BarLineComplexChart } from '@ssa-ui-kit/core';
import { useElementSize } from '@ssa-ui-kit/hooks';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { usePanelData } from '@entities/panel';
import { matchPanelDataSource, Panel, PanelConfig } from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type TimeseriesPanelProps = {
  panel: Panel;
  /** Optional title for the panel, defaults to panel.title */
  title?: string;
};

export const TimeseriesPanel = ({
  panel,
  title: providedTitle,
}: TimeseriesPanelProps) => {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const panelDataQuery = usePanelData(panel);
  const title = providedTitle ?? panel.title;

  if (!panelDataQuery.isLoaded) {
    return <LoadingPanel title={title} />;
  }
  if (panelDataQuery.error) {
    return <ErrorPanel title={title} />;
  }

  const panelData = panelDataQuery.data;
  const { series, valuePrefix, valueSuffix } = matchPanelDataSource(
    panelData.source,
    {
      grafana: () => grafanaDataAdapter({ panel, data: panelData.data }),
    },
  );

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <BarLineComplexChart
        width="100%"
        height="100%"
        features={['header']}
        systemModeBarButtons={[]}
        cardProps={{
          title,
        }}
        layout={{
          autosize: true,
          width: width,
          margin: { r: 50 },
          xaxis: {
            tickmode: 'auto',
          },
          yaxis2: {
            ticksuffix: valueSuffix,
            tickprefix: valuePrefix,
            tickmode: 'auto',
          },
        }}
        data={series}
      />
    </div>
  );
};

export const panelConfig: PanelConfig<TimeseriesPanelProps> = {
  componentId: 'timeseries-default',
  name: 'Timeseries Panel',
  Component: TimeseriesPanel,
  supportedTypes: ['timeseries', 'bargauge'],
  propsSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Panel Title',
      },
    },
  },
  uiSchema: {
    title: {
      'ui:help': 'Override the default panel title',
      'ui:placeholder': 'Panel Title',
    },
  },
};
