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
    ['#ED995D', '#EDAA5D', '#EDBA5D', '#FFCF78', '#FFDFA5'],
    ['#4178E1', '#7599DE', '#8BB2FD', '#A6C4FF', '#CEDFFF'],
    ['#36AB6C', '#52C587', '#89D996', '#A7F3B3', '#C0FFCA'],
    ['#EB7556', '#FF917E', '#F2888E', '#FFA6A8', '#FFD4CB'],
  ];

  return { legendBackgrounds, pieChartColors };
};
