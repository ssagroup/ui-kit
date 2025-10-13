import { css } from '@emotion/css';
import { withPanelData } from '@entities/panel';
import {
  matchPanelDataSource,
  Panel,
  PanelConfig,
  PanelData,
} from '@shared/panel';

import { GaugeChart } from '@ssa-ui-kit/core';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type GaugePanelProps = {
  panel: Panel;
  panelData: PanelData;
  /** Optional title for the panel, defaults to panel.title */
  title?: string;
};

export const GaugePanel = ({
  panel,
  panelData,
  title: providedTitle,
}: GaugePanelProps) => {
  const title = providedTitle ?? panel.title;
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
  Component: withPanelData(GaugePanel),
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
