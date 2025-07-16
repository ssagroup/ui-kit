import { BarLineComplexChart } from '@ssa-ui-kit/core';
import { useElementSize } from '@ssa-ui-kit/hooks';

import { withPanelData } from '@entities/panel';
import {
  matchPanelDataSource,
  Panel,
  PanelConfig,
  PanelData,
} from '@shared/panel';

import { grafanaDataAdapter } from './data-adapters/grafana';

export type TimeseriesPanelProps = {
  panel: Panel;
  panelData: PanelData;
  /** Optional title for the panel, defaults to panel.title */
  title?: string;
  /** Optional hover format for the x axis */
  xAxisHoverFormat?: string;
  /** Optional label width for the y axis, defaults to 50 */
  labelWidth?: number;
};

export const TimeseriesPanel = ({
  panel,
  panelData,
  title: providedTitle,
  xAxisHoverFormat,
  labelWidth = 50,
}: TimeseriesPanelProps) => {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const title = providedTitle ?? panel.title;

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
          margin: { r: labelWidth },
          xaxis: {
            tickmode: 'auto',
            hoverformat: xAxisHoverFormat,
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
  Component: withPanelData(TimeseriesPanel),
  supportedTypes: ['timeseries', 'bargauge'],
  propsSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Panel Title',
      },
      xAxisHoverFormat: {
        type: 'string',
        title: 'X Axis Hover Format',
        default: '%H:%M, %d %b',
      },
      labelWidth: {
        type: 'number',
        title: 'Label Width',
        default: 50,
      },
    },
  },
  uiSchema: {
    title: {
      'ui:help': 'Override the default panel title',
      'ui:placeholder': 'Panel Title',
    },
    xAxisHoverFormat: {
      'ui:help': 'Format for the x-axis hover tooltip',
      'ui:placeholder': 'X Axis Hover Format (e.g., %H:%M, %d %b)',
    },
    labelWidth: {
      'ui:help': 'Set the width of the y axis label in pixels',
      'ui:placeholder': 'Label Width',
    },
  },
};
