import { BarLineChartItem } from '../types';

const axisXTimestamps = [
  1388572800000, 1391260800000, 1393670400000, 1396348800000, 1398940800000,
  1401619200000, 1404211200000, 1406899200000, 1409577600000, 1412179200000,
  1414857600000, 1417545600000, 1420233600000,
];

// marker => color use for colors customizing
// TODO: remove marker => color after
export const mockData: BarLineChartItem[] = [
  {
    x: axisXTimestamps,
    y: [10, 12, 8, 15, 20, 18, 25, 22, 13, 16, 30, 24, 27],
    name: 'Department 1',
    type: 'bar',
    selected: false,
    marker: {
      color: '#00f',
    },
  },
  {
    x: axisXTimestamps,
    y: [7, 5, 12, 11, 5, 6, 19, 11, 9, 10, 17, 18, 13],
    name: 'Department 2',
    type: 'bar',
    selected: true,
    marker: {
      color: '#f00',
    },
  },
  {
    x: axisXTimestamps,
    y: [15, 18, 7, 20, 16, 12, 7, 18, 6, 14, 12, 15, 16],
    name: 'Department 3',
    type: 'bar',
    selected: true,
    marker: {
      color: '#0f0',
    },
  },
  {
    x: axisXTimestamps,
    y: [14, 14, 19, 13, 9, 14, 23, 20, 24, 21, 8, 19, 17],
    name: 'Department 4',
    type: 'bar',
    selected: false,
    marker: {
      color: '#ff0',
    },
  },
  {
    x: axisXTimestamps,
    y: [3, 8, 9, 6, 4, 11, 10, 8, 16, 7, 11, 9, 10],
    name: 'Department 5',
    type: 'bar',
    selected: true,
    marker: {
      color: '#f0f',
    },
  },
  {
    x: axisXTimestamps,
    y: [3, 5, 7, 6, 4, 6, 7, 8, 6, 7, 8, 9, 10],
    name: 'Min',
    type: 'scatter',
    selected: true,
    marker: {
      color: '#0ff',
    },
  },
  {
    x: axisXTimestamps,
    y: [9, 11.5, 13, 13, 12, 12, 16, 15, 15, 14, 19, 16.5, 18.5],
    name: 'Average',
    type: 'scatter',
    selected: true,
    marker: {
      color: '#ffe',
    },
  },
  {
    x: axisXTimestamps,
    y: [15, 18, 19, 20, 20, 18, 25, 22, 24, 21, 30, 24, 27],
    name: 'Max',
    type: 'scatter',
    line: {
      shape: 'linear',
    },
    selected: false,
    marker: {
      color: '#aa0',
    },
  },
];

export const mockDataWithDifferentLineType: BarLineChartItem[] = [
  {
    x: axisXTimestamps,
    y: [10, 12, 8, 15, 20, 18, 25, 22, 13, 16, 30, 24, 27],
    name: 'Department 1',
    type: 'bar',
    marker: {
      line: {
        width: 1,
        color: '#ED995D',
      },
    },
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [7, 5, 12, 11, 5, 6, 19, 11, 9, 10, 17, 18, 13],
    name: 'Department 2',
    type: 'bar',
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [15, 18, 7, 20, 16, 12, 7, 18, 6, 14, 12, 15, 16],
    name: 'Department 3',
    type: 'bar',
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [14, 14, 19, 13, 9, 14, 23, 20, 24, 21, 8, 19, 17],
    name: 'Department 4',
    type: 'bar',
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [3, 8, 9, 6, 4, 11, 10, 8, 16, 7, 11, 9, 10],
    name: 'Department 5',
    type: 'bar',
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [3, 5, 7, 6, 4, 6, 7, 8, 6, 7, 8, 9, 10],
    name: 'Min',
    type: 'scatter',
    line: {
      shape: 'linear',
    },
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [9, 11.5, 13, 13, 12, 12, 16, 15, 15, 14, 19, 16.5, 18.5],
    name: 'Average',
    type: 'scatter',
    line: {
      shape: 'spline',
      dash: 'dot',
    },
    selected: true,
  },
  {
    x: axisXTimestamps,
    y: [15, 18, 19, 20, 20, 18, 25, 22, 24, 21, 30, 24, 27],
    name: 'Max',
    type: 'scatter',
    selected: true,
  },
];
