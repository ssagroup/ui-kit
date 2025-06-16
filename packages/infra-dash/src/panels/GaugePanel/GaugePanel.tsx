import { GaugeChart } from '@ssa-ui-kit/core';
import { css } from '@emotion/css';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { usePanelData } from '@entities/panel';
import { matchPanelDataSource, Panel, PanelConfig } from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type GaugePanelProps = {
  panel: Panel;
  /** Optional title for the panel, defaults to panel.title */
  title?: string;
};

export const GaugePanel = ({
  panel,
  title: providedTitle,
}: GaugePanelProps) => {
  const panelDataQuery = usePanelData(panel);
  const title = providedTitle ?? panel.title;

  if (!panelDataQuery.isLoaded) {
    return <LoadingPanel title={title} />;
  }
  if (panelDataQuery.error) {
    return <ErrorPanel title={title} />;
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
      title={title}
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

export const panelConfig: PanelConfig<GaugePanelProps> = {
  componentId: 'gauge-default',
  name: 'Gauge Panel',
  Component: GaugePanel,
  supportedTypes: ['gauge'],
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
