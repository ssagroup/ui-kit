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
      displaylogo: false,
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
