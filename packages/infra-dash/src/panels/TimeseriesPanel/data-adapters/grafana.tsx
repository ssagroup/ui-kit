import { getValueFormat } from '@grafana/data';

import { DataAdapterOptions } from '@shared/dataAdapter';
import { GrafanaPanelData } from '@shared/grafana';

export const grafanaDataAdapter = ({
  panel,
  data,
}: DataAdapterOptions<GrafanaPanelData>) => {
  const { results } = data.data;

  const xIndex = 0;
  const yIndex = 1;

  const frames = Object.values(results).flatMap((result) => result.frames);
  const defaultFieldConfig = panel.panelSchema?.fieldConfig?.defaults;

  const unit =
    frames[0]?.schema?.fields?.[yIndex]?.config?.unit ??
    defaultFieldConfig?.unit;
  const formattedValue = getValueFormat(unit)(0);

  const series = frames.map((frame) => {
    const values = frame?.data?.values ?? [];
    const x = values[xIndex] ?? [];
    const y = values[yIndex] ?? [];
    const yField = frame.schema?.fields?.[yIndex];
    const color = defaultFieldConfig?.color?.fixedColor;
    const name =
      yField?.config?.displayName ??
      yField?.config?.displayNameFromDS ??
      yField?.name ??
      frame.schema?.refId;
    return {
      x: x as number[],
      y: y as number[],
      name,
      marker: {
        color: color,
      },
      selected: true,
      showlegend: true,
      type: 'scatter' as const,
      hovertemplate: `${name}: ${formattedValue.prefix ?? ''}%{y:}${formattedValue.suffix ?? ''}<extra></extra>`,
    };
  });

  return {
    series,
    valuePrefix: formattedValue.prefix,
    valueSuffix: formattedValue.suffix,
  };
};
