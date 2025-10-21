import { getValueFormat } from '@grafana/data';
import { DataAdapterOptions } from '@shared/dataAdapter';
import { GrafanaPanelData } from '@shared/grafana';

const inferMinMax = (values: number[], unit?: string) => {
  if (unit === 'percent') {
    return { min: 0, max: 100 };
  }
  if (unit === 'percentunit') {
    return { min: 0, max: 1 };
  }
  if (!values.length) {
    return { min: 0, max: 100 };
  }
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

export const grafanaDataAdapter = ({
  panel,
  data,
}: DataAdapterOptions<GrafanaPanelData>) => {
  const { results } = data.data;

  const yIndex = 1;

  const frames = Object.values(results).flatMap((result) => result.frames);
  const defaultFieldConfig = panel.panelSchema?.fieldConfig?.defaults;
  if (frames.length > 1) {
    throw new Error(
      `Expected a single frame for gauge panel, but found ${frames.length} frames.`,
    );
  }

  const dataFrame = frames[0];
  const values = (dataFrame?.data?.values?.[yIndex] ?? []) as number[];
  const value = (values?.at(-1) as number) ?? 0;
  const unit =
    dataFrame?.schema?.fields?.[yIndex]?.config?.unit ??
    defaultFieldConfig?.unit;
  const formattedValue = getValueFormat(unit)(value);

  const { min, max } = inferMinMax(values, unit);

  const thresholds =
    defaultFieldConfig?.thresholds?.steps?.map(({ color, value }) => ({
      color,
      value: value ?? 0,
    })) ?? [];

  const segments = thresholds.map((threshold, index) => ({
    color: threshold.color,
    value: thresholds[index + 1]?.value ?? 100, // use next threshold value or default to 100
  }));

  return {
    min,
    max,
    thresholds,
    segments,
    value,
    valueSuffix: formattedValue.suffix,
    valuePrefix: formattedValue.prefix,
  };
};
