import { ProgressChartTooltip } from '@ssa-ui-kit/core';

import type { MapIconsType } from '@ssa-ui-kit/core';

import { MealNutrientsTooltipProps } from './types';

const capitalize = (str: string) =>
  `${str[0].toUpperCase()}${str.substring(1)}`;

export const MealNutrientsTooltip = ({
  colorName,
  point,
}: MealNutrientsTooltipProps) => {
  const caption = capitalize(String(point.serieId));
  const {
    data: { y, comp, unit },
  } = point;
  const iconName =
    ((comp && `arrow-${comp > 0 ? 'up' : 'down'}`) as keyof MapIconsType) ||
    undefined;

  return (
    <ProgressChartTooltip
      caption={caption}
      value={y as number}
      valueFormatted={`${comp}${unit}`}
      iconName={iconName}
      barProps={{ color: colorName }}
    />
  );
};
