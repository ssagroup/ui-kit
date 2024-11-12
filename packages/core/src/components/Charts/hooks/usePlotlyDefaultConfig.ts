import { PlotParams } from 'react-plotly.js';
import { useTheme } from '@emotion/react';

interface UsePlotlyDefaultConfig {
  (): {
    layout: PlotParams['layout'];
    config: PlotParams['config'];
    emptyBar: PlotParams['data'][0];
  };
}

export const usePlotlyDefaultConfig: UsePlotlyDefaultConfig = () => {
  const theme = useTheme();

  return {
    layout: {
      margin: {
        b: 0,
        l: 0,
        r: 30,
        t: 20,
        pad: 10,
      },
      font: {
        family: "'Manrope',sans-serif",
        size: 10,
      },
      autosize: true,
      hovermode: 'x unified',
    } as PlotParams['layout'],
    config: {
      responsive: true,
      autosizable: true,
    } as PlotParams['config'],
    emptyBar: {
      type: 'bar',
      yaxis: 'y2',
      marker: {
        color: theme.colors.greyLighter,
      },
      hovertemplate: '<b>No data yet!</b><extra></extra>',
      showlegend: false,
    } as PlotParams['data'][0],
  };
};
