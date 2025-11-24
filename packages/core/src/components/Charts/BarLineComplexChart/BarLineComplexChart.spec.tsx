import React from 'react';
import { BarLineComplexChart } from '@components';
import { mockData, mockDataHorizontal } from './__mock__/data';

// Mock window.matchMedia for useDeviceType hook
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockReact = React;
jest.mock('react-plotly.js', () => ({
  __esModule: true,
  default: ({ data, layout }: { data: unknown[]; layout: unknown }) =>
    mockReact.createElement('div', {
      'data-testid': 'plotly-chart',
      'data-chart-data': JSON.stringify(data),
      'data-layout': JSON.stringify(layout),
    }),
}));

describe('BarLineComplexChart', () => {
  it('Should render with title', () => {
    const { getByTestId } = render(
      <BarLineComplexChart
        data={mockData}
        width="670px"
        height="220px"
        cardProps={{
          title: 'Bar & Line Complex Chart',
        }}
      />,
    );

    const chart = getByTestId('plotly-chart');
    const layout = JSON.parse(chart.getAttribute('data-layout') || '{}');

    expect(layout.title?.text).toBe('Bar & Line Complex Chart');
  });

  describe('Horizontal orientation', () => {
    it('Should set legend traceorder to reversed for horizontal charts', () => {
      const { getByTestId } = render(
        <BarLineComplexChart
          data={mockDataHorizontal}
          width="670px"
          height="220px"
        />,
      );

      const chart = getByTestId('plotly-chart');
      const layout = JSON.parse(chart.getAttribute('data-layout') || '{}');

      expect(layout.legend?.traceorder).toBe('reversed');
    });

    it('Should reverse data order for horizontal charts', () => {
      const { getByTestId } = render(
        <BarLineComplexChart
          data={mockDataHorizontal}
          width="670px"
          height="220px"
        />,
      );

      const chart = getByTestId('plotly-chart');
      const chartData = JSON.parse(
        chart.getAttribute('data-chart-data') || '[]',
      );

      expect(chartData.length).toBeGreaterThan(0);

      const firstItem = chartData[0];
      const lastItem = chartData[chartData.length - 1];

      expect(['Department 7', 'Department 8']).toContain(firstItem.name);
      expect(lastItem.name).toBe('Department 2');
    });
  });

  describe('Vertical orientation', () => {
    it('Should set legend traceorder to normal for vertical charts', () => {
      const { getByTestId } = render(
        <BarLineComplexChart data={mockData} width="670px" height="220px" />,
      );

      const chart = getByTestId('plotly-chart');
      const layout = JSON.parse(chart.getAttribute('data-layout') || '{}');

      expect(layout.legend?.traceorder).toBe('normal');
    });

    it('Should not reverse data order for vertical charts', () => {
      const { getByTestId } = render(
        <BarLineComplexChart data={mockData} width="670px" height="220px" />,
      );

      const chart = getByTestId('plotly-chart');
      const chartData = JSON.parse(
        chart.getAttribute('data-chart-data') || '[]',
      );

      expect(chartData.length).toBeGreaterThan(0);

      const firstItem = chartData[0];

      expect(firstItem.name).toBe('Department 2');
    });
  });
});
