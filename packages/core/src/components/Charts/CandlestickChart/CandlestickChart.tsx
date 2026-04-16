import { renderToString } from 'react-dom/server';
import Plot, { PlotParams } from 'react-plotly.js';
import { useTheme } from '@emotion/react';

import {
  WidgetCardProps,
  WidgetCardTitle,
  WithWidgetCard,
} from '@components/WidgetCard';
import CardHeader from '@components/CardHeader';
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

export interface CandlestickChartProps extends Partial<
  Omit<PlotParams, 'data' | 'style'>
> {
  data: CandlestickChartData;
  style?: CandlestickStyle;
  title?: React.ReactNode;
  features?: CandlestickChartFeatures[];
  widgetCardProps?: WidgetCardProps;
}

export const CandlestickChartComponent = ({
  title,
  data,
  features = [],
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
    // title is rendered as an absolutely positioned overlay so it shares the same
    // visual row as Plotly's mode bar buttons, matching the original Plotly title behavior.
    // Plotly does not support JSX in layout.title, so this DOM overlay is used instead.
    <WithWidgetCard features={features} cardProps={{ ...widgetCardProps }}>
      <div css={{ position: 'relative', width: '100%', height: '100%' }}>
        {title && (
          <CardHeader
            css={{
              position: 'absolute',
              top: '1px',
              left: '10px',
              width: 'auto',
              marginBottom: 0,
              zIndex: 1,
            }}>
            <WidgetCardTitle
              variant="h3"
              weight="bold"
              css={{
                flexDirection: 'row',
                lineHeight: 1,
                fontSize: '24px',
                [theme.mediaQueries.md]: {
                  fontSize: '24px',
                },
              }}>
              {title}
            </WidgetCardTitle>
          </CardHeader>
        )}
        <Plot
          layout={{
            ...plotlyDefaultLayoutConfig.layout,
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
      </div>
    </WithWidgetCard>
  );
};

export const CandlestickChart = WithFullscreenMode(
  CandlestickChartComponent,
) as typeof CandlestickChartComponent;
