import { css } from '@emotion/css';
import { BarGaugeChart } from '@ssa-ui-kit/core';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { usePanelData } from '@entities/panel';
import { matchPanelDataSource, Panel, PanelConfig } from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type BarGaugePanelProps = {
  panel: Panel;
};

export const GrafanaBarGaugePanel = ({ panel }: BarGaugePanelProps) => {
  const panelDataQuery = usePanelData(panel.id);
  if (!panelDataQuery.isLoaded) {
    return <LoadingPanel title={panel.title} />;
  }
  if (panelDataQuery.error) {
    return <ErrorPanel title={panel.title} />;
  }

  const panelData = panelDataQuery.data;
  const { bars } = matchPanelDataSource(panelData.source, {
    grafana: () => grafanaDataAdapter({ panel, data: panelData.data }),
  });

  return (
    <BarGaugeChart
      features={['header']}
      title={panel.title}
      bars={bars}
      widgetCardProps={{
        contentClassName: css({ overflow: 'auto' }),
      }}
      wrapperProps={{
        className: css({ gap: '2px !important' }),
      }}
    />
  );
};

export const panelConfig: PanelConfig = {
  componentId: 'bargauge-default',
  name: 'Bar Gauge Panel',
  Component: GrafanaBarGaugePanel,
  supportedTypes: ['bargauge'],
};
