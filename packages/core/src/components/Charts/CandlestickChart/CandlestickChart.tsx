import { renderToString } from 'react-dom/server';
import Plot, { PlotParams } from 'react-plotly.js';
import { useTheme } from '@emotion/react';

import { WidgetCardProps, WithWidgetCard } from '@components/WidgetCard';
import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';
import Icon from '@components/Icon';

import { usePlotlyDefaultConfig } from '../hooks';
import {
  CandlestickChartData,
  CandlestickStyle,
  getCandlestickPlotData,
} from './utils';

export type CandlestickChartFeatures = 'header' | 'fullscreenMode';

export interface CandlestickChartProps
  extends Partial<Omit<PlotParams, 'data' | 'style'>> {
  data: CandlestickChartData;
  style?: CandlestickStyle;
  title?: string;
  features?: CandlestickChartFeatures[];
  widgetCardProps?: WidgetCardProps;
}

export const CandlestickChartComponent = ({
  title,
  data,
  features,
  widgetCardProps,
  style = 'hollow',
  ...plotParams
}: CandlestickChartProps) => {
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig();
  const { isFullscreenMode, toggleFullscreenMode } = useFullscreenMode();
  const theme = useTheme();

  const { config, layout, ...restPlotParams } = plotParams;

  const plotData = getCandlestickPlotData(
    style,
    data,
    theme.colors.green!,
    theme.colors.pink!,
  );

  const extraModeBarButtons: Plotly.ModeBarButtonAny[] = [];
  if (features?.includes('fullscreenMode')) {
    extraModeBarButtons.push({
      name: 'fullscreen',
      icon: {
        svg: renderToString(<Icon name="maximize" />),
      },
      title: isFullscreenMode ? 'Exit fullscreen mode' : 'Fullscreen mode',
      click: toggleFullscreenMode,
      attr: 'fullscreen-mode-icon',
      gravity: '1',
    });
  }

  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        ...widgetCardProps,
      }}>
      <Plot
        layout={{
          ...plotlyDefaultLayoutConfig.layout,
          title: {
            text: title,
            x: 0,
            y: 1,
            pad: {
              l: 10,
              t: 5,
            },
            font: {
              size: 24,
              weight: 700,
              family: 'Manrope, sans-serif',
            },
          },
          dragmode: 'zoom',
          xaxis: { rangeslider: { visible: false } },
          yaxis: { side: 'right' },
          margin: {
            t: 20,
            b: 40,
            l: 20,
            r: 20,
          },
          showlegend: false,
          ...layout,
        }}
        css={{ width: '100%', height: '100%' }}
        useResizeHandler
        data={plotData}
        config={{
          ...plotlyDefaultLayoutConfig.config,
          modeBarButtons: [
            extraModeBarButtons,
            [
              'zoom2d',
              'pan2d',
              'select2d',
              'zoomIn2d',
              'zoomOut2d',
              'autoScale2d',
              'resetScale2d',
            ],
          ],
          ...config,
        }}
        {...restPlotParams}
      />
    </WithWidgetCard>
  );
};

export const CandlestickChart = WithFullscreenMode(CandlestickChartComponent);
