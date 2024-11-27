import { BarLineComplexChartProps } from './types';
import { useTooltip } from '@components/Tooltip/useTooltip';
import { TooltipContext } from '@components/Tooltip/useTooltipContext';
import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';
import { BarLineComplexChartInternal } from './BarLineComplexChartInternal';
import { BarLineComplexChartContextProvider } from './BarLIneComplexChart.context';
import { useEffect } from 'react';

// +feature - fullscreen mode
// +disabled item styling
// we don't need dotted lines on this stage
const BarLineComplexChartComponent = ({
  data,
  lineShape = 'linear',
  maxVisibleBars = 5, // need to be implemented
  maxVisibleLines = 3, // need to be implemented
  title = 'Bar & Line Complex Chart',
  cardProps,
  features = [],
  onFullscreenModeChange,
  ...rest
}: BarLineComplexChartProps) => {
  const tooltip = useTooltip();
  const { isFullscreenMode } = useFullscreenMode();

  useEffect(() => {
    onFullscreenModeChange?.(isFullscreenMode);
  }, [isFullscreenMode]);
  return (
    <BarLineComplexChartContextProvider
      data={data}
      lineShape={lineShape}
      maxVisibleBars={maxVisibleBars}
      maxVisibleLines={maxVisibleLines}
      features={features}>
      <TooltipContext.Provider value={tooltip}>
        <BarLineComplexChartInternal
          {...rest}
          cardProps={{
            ...cardProps,
            title: cardProps?.title || title,
          }}
        />
      </TooltipContext.Provider>
    </BarLineComplexChartContextProvider>
  );
};

export const BarLineComplexChart = WithFullscreenMode(
  BarLineComplexChartComponent,
);
