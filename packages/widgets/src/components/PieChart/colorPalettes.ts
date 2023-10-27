import { Theme } from '@emotion/react';
import { MainColors } from '@ssa-ui-kit/core';

export const getBalancePalette = (theme: Theme) => {
  const legendColorNames = [
    'yellow',
    'blue',
    'green',
    'yellowWarm',
    'blueLight',
    'turquoise',
    'pink',
    'purple',
  ] as unknown as Array<keyof MainColors>;

  const pieChartColors = [
    theme.colors.yellow,
    theme.colors.blue,
    theme.colors.green,
    theme.colors.yellowLighter,
    theme.colors.blueLight,
    theme.colors.turquoise,
    theme.colors.pink,
    theme.colors.purple,
  ] as unknown as string[];

  return { legendColorNames, pieChartColors };
};
