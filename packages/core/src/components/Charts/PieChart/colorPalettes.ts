import { Theme } from '@emotion/react';

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
    'blueCool',
    'cyanTeal',
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
    theme.colors.blueCool,
    theme.colors.cyanTeal,
  ] as unknown as string[];

  return { legendColorNames, pieChartColors };
};
