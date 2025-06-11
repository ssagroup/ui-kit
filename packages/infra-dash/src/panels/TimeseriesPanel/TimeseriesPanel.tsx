import { BarLineComplexChart } from '@ssa-ui-kit/core';
import { useElementSize } from '@ssa-ui-kit/hooks';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { usePanelData } from '@entities/panel';
import { matchPanelDataSource, Panel, PanelConfig } from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type TimeseriesPanelProps = {
  panel: Panel;
};

export const TimeseriesPanel = ({ panel }: TimeseriesPanelProps) => {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const panelDataQuery = usePanelData(panel.id);
  if (!panelDataQuery.isLoaded) {
    return <LoadingPanel title={panel.title} />;
  }
  if (panelDataQuery.error) {
    return <ErrorPanel title={panel.title} />;
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
          title: panel.title,
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

export const panelConfig: PanelConfig = {
  componentId: 'timeseries-default',
  name: 'Timeseries Panel',
  Component: TimeseriesPanel,
  supportedTypes: ['timeseries'],
  propsSchema: {},
};
