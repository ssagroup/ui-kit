import { GaugeChart } from '@ssa-ui-kit/core';
import { css } from '@emotion/css';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { usePanelData } from '@entities/panel';
import { matchPanelDataSource, Panel, PanelConfig } from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type GaugePanelProps = {
  panel: Panel;
};

export const GaugePanel = ({ panel }: GaugePanelProps) => {
  const panelDataQuery = usePanelData(panel.id);
  if (!panelDataQuery.isLoaded) {
    return <LoadingPanel title={panel.title} />;
  }
  if (panelDataQuery.error) {
    return <ErrorPanel title={panel.title} />;
  }

  const panelData = panelDataQuery.data;
  const { min, max, value, valuePrefix, valueSuffix, segments } =
    matchPanelDataSource(panelData.source, {
      grafana: () => grafanaDataAdapter({ panel, data: panelData.data }),
    });

  return (
    <GaugeChart
      features={['header']}
      containerProps={{ className: css({ width: '100%', height: '100%' }) }}
      title={panel.title}
      unitLabel={valueSuffix}
      maxValue={max}
      minValue={min}
      minLabel={`${valuePrefix ?? ''}${min}${valueSuffix ?? ''}`}
      maxLabel={`${valuePrefix ?? ''}${max}${valueSuffix ?? ''}`}
      value={value}
      segments={segments}
    />
  );
};

export const panelConfig: PanelConfig = {
  componentId: 'gauge-default',
  name: 'Gauge Panel',
  Component: GaugePanel,
  supportedTypes: ['gauge'],
};
