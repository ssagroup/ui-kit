import { Theme } from '@emotion/react';

export const getColorPalette = (theme: Theme) => {
  const legendColorNames = [
    'yellow',
    'blue',
    'green',
    'yellowWarm',
    'blueLight',
    'turquoise',
    'pink',
    'purple',
    '#6C94F7',
    '#55D6D2',
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
    '#6C94F7',
    '#55D6D2',
  ] as unknown as string[];

  return { legendColorNames, pieChartColors };
};
