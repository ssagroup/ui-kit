import { ChartData } from '../types';

const axisXLabels = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];

export const mockData: ChartData = {
  config: {
    showBars: true,
    showLines: true,
  },
  data: [
    {
      x: axisXLabels,
      y: [10, 12, 8, 15, 20, 18, 25, 22, 13, 16, 30, 24],
      name: 'Bar 1',
      type: 'bar',
    },
    {
      x: axisXLabels,
      y: [7, 5, 12, 11, 5, 6, 19, 11, 9, 10, 17, 18],
      name: 'Bar 2',
      type: 'bar',
    },
    {
      x: axisXLabels,
      y: [15, 18, 7, 20, 16, 12, 7, 18, 6, 14, 12, 15],
      name: 'Bar 3',
      type: 'bar',
    },
    {
      x: axisXLabels,
      y: [14, 14, 19, 13, 9, 14, 23, 20, 24, 21, 8, 19],
      name: 'Bar 4',
      type: 'bar',
    },
    {
      x: axisXLabels,
      y: [3, 8, 9, 6, 4, 11, 10, 8, 16, 7, 11, 9],
      name: 'Bar 5',
      type: 'bar',
    },
    {
      x: axisXLabels,
      y: [20, 30, 35, 22, 40, 45, 33, 37, 46, 28, 35, 50],
      name: 'Line 1',
      type: 'scatter',
    },
    {
      x: axisXLabels,
      y: [15, 25, 28, 27, 34, 41, 25, 43, 39, 23, 40, 48],
      name: 'Line 2',
      type: 'scatter',
    },
    {
      x: axisXLabels,
      y: [17, 21, 32, 19, 29, 38, 21, 29, 32, 19, 25, 42],
      name: 'Line 3',
      type: 'scatter',
    },
  ],
};
