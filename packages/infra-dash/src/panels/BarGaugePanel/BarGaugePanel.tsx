import { css } from '@emotion/css';
import { BarGaugeChart } from '@ssa-ui-kit/core';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { usePanelData } from '@entities/panel';
import { matchPanelDataSource, Panel, PanelConfig } from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type BarGaugePanelProps = {
  panel: Panel;
  /** Optional title for the panel, defaults to panel.title */
  title?: string;
  /** Optional label width for the bar gauge, defaults to 80 */
  labelWidth?: number;
};

export const GrafanaBarGaugePanel = ({
  title: providedTitle,
  panel,
  labelWidth = 80,
}: BarGaugePanelProps) => {
  const panelDataQuery = usePanelData(panel);
  const title = providedTitle ?? panel.title;

  if (!panelDataQuery.isLoaded) {
    return <LoadingPanel title={title} />;
  }
  if (panelDataQuery.error) {
    return <ErrorPanel title={title} />;
  }

  const panelData = panelDataQuery.data;
  const { bars } = matchPanelDataSource(panelData.source, {
    grafana: () =>
      grafanaDataAdapter({ panel, data: panelData.data, labelWidth }),
  });

  return (
    <BarGaugeChart
      features={['header']}
      title={title}
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

export const panelConfig: PanelConfig<BarGaugePanelProps> = {
  componentId: 'bargauge-default',
  name: 'Bar Gauge Panel',
  Component: GrafanaBarGaugePanel,
  supportedTypes: ['bargauge', 'gauge'],
  propsSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Panel Title',
      },
      labelWidth: {
        type: 'number',
        title: 'Label Width',
        default: 80,
        description: 'Width of the label in pixels',
      },
    },
  },
  uiSchema: {
    title: {
      'ui:help': 'Override the default panel title',
      'ui:placeholder': 'Panel Title',
    },
    labelWidth: {
      'ui:help': 'Set the width of the label in pixels',
      'ui:placeholder': 'Label Width',
    },
  },
};
