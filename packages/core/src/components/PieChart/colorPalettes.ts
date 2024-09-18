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

export const getAccountPalette = (theme: Theme) => {
  const legendBackgrounds = [
    'linear-gradient(90deg, #ED995D 0%, #EDBA5D 100%)',
    'linear-gradient(247deg, #7599DE 14.71%, #4178E1 85.29%)',
    'linear-gradient(296deg, #89D996 16.38%, #52C587 83.62%)',
    'linear-gradient(68deg, #EB7556 12.3%, #F2888E 88.95%)',
    theme.colors.blueLight,
    theme.colors.turquoise,
    theme.colors.pink,
    theme.colors.purple,
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
  ];

  return { legendBackgrounds, pieChartColors };
};
