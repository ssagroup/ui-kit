const axisXTimestamps = [
  1388572800000, 1391260800000, 1393670400000, 1396348800000, 1398940800000,
  1401619200000, 1404211200000, 1406899200000, 1409577600000, 1412179200000,
  1414857600000, 1417545600000,
];

export const mockData: Plotly.Data[] = [
  {
    x: axisXTimestamps,
    y: [10, 12, 8, 15, 20, 18, 25, 22, 13, 16, 30, 24],
    name: 'Department 1',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [7, 5, 12, 11, 5, 6, 19, 11, 9, 10, 17, 18],
    name: 'Department 2',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [15, 18, 7, 20, 16, 12, 7, 18, 6, 14, 12, 15],
    name: 'Department 3',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [14, 14, 19, 13, 9, 14, 23, 20, 24, 21, 8, 19],
    name: 'Department 4',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [3, 8, 9, 6, 4, 11, 10, 8, 16, 7, 11, 9],
    name: 'Department 5',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [20, 25, 21, 15, 31, 10, 30, 15, 10, 28, 30, 20],
    name: 'Department 6',
    type: 'scatter',
  },
  {
    x: axisXTimestamps,
    y: [15, 25, 28, 27, 15, 25, 19, 30, 10, 13, 19, 22],
    name: 'Department 7',
    type: 'scatter',
  },
  {
    x: axisXTimestamps,
    y: [17, 21, 25, 19, 21, 28, 21, 19, 12, 19, 25, 32],
    name: 'Department 8',
    type: 'scatter',
    line: {
      shape: 'linear',
    },
  },
];

export const mockDataWithDifferentLineType: Plotly.Data[] = [
  {
    x: axisXTimestamps,
    y: [10, 12, 8, 15, 20, 18, 25, 22, 13, 16, 30, 24],
    name: 'Department 1',
    type: 'bar',
    marker: {
      line: {
        width: 1,
        color: '#ED995D',
      },
    },
  },
  {
    x: axisXTimestamps,
    y: [7, 5, 12, 11, 5, 6, 19, 11, 9, 10, 17, 18],
    name: 'Department 2',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [15, 18, 7, 20, 16, 12, 7, 18, 6, 14, 12, 15],
    name: 'Department 3',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [14, 14, 19, 13, 9, 14, 23, 20, 24, 21, 8, 19],
    name: 'Department 4',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [3, 8, 9, 6, 4, 11, 10, 8, 16, 7, 11, 9],
    name: 'Department 5',
    type: 'bar',
  },
  {
    x: axisXTimestamps,
    y: [20, 25, 21, 15, 31, 10, 30, 15, 10, 28, 30, 20],
    name: 'Department 6',
    type: 'scatter',
    line: {
      shape: 'linear',
    },
  },
  {
    x: axisXTimestamps,
    y: [15, 25, 28, 27, 15, 25, 19, 30, 10, 13, 19, 22],
    name: 'Department 7',
    type: 'scatter',
    line: {
      shape: 'spline',
    },
  },
  {
    x: axisXTimestamps,
    y: [17, 21, 25, 19, 21, 28, 21, 19, 12, 19, 25, 32],
    name: 'Department 8',
    type: 'scatter',
    line: {
      dash: 'dot',
    },
  },
];
