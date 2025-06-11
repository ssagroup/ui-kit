import { getValueFormat } from '@grafana/data';
import { GaugeBarValueFormatter } from '@ssa-ui-kit/core';

import { DataAdapterOptions } from '@shared/dataAdapter';
import { GrafanaPanelData } from '@shared/grafana';

export const grafanaDataAdapter = ({
  panel,
  data,
}: DataAdapterOptions<GrafanaPanelData>) => {
  const panelData = data.data;

  const yIndex = 1;

  const defaultFieldConfig = panel.panelSchema?.fieldConfig?.defaults;

  const thresholds =
    defaultFieldConfig?.thresholds?.steps?.map(({ color, value }) => ({
      color,
      value: value ?? 0,
    })) ?? [];

  const unit = defaultFieldConfig?.unit;
  const valueFormat = getValueFormat(unit);

  const valueFormatter: GaugeBarValueFormatter = (v, color) => {
    const formattedValue = valueFormat(v);
    return (
      <div css={{ color, width: '80px', textAlign: 'right' }}>
        {formattedValue.prefix && (
          <span css={{ fontSize: '14px' }}>{formattedValue.prefix}</span>
        )}
        {formattedValue.text}{' '}
        {formattedValue.suffix && (
          <span css={{ fontSize: '14px' }}>{formattedValue.suffix}</span>
        )}
      </div>
    );
  };

  const bars = Object.values(panelData.results)
    .flatMap((result) =>
      result.frames.map((frame) => {
        const y = frame.data?.values?.[yIndex] ?? [];
        const value = y.at(-1) as number;
        const yField = frame.schema?.fields?.[yIndex];
        return {
          title:
            yField?.config?.displayName ??
            yField?.config?.displayNameFromDS ??
            yField?.name ??
            frame.schema?.refId,
          value: Number(value.toFixed(2)),
          valueFormatter,
          thresholds,
        };
      }),
    )
    .filter((bar) => bar.value !== undefined);

  return { bars };
};
