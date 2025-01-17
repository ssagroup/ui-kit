import { useEffect } from 'react';
import { useTooltip } from '@components/Tooltip/useTooltip';
import { TooltipContext } from '@components/Tooltip/useTooltipContext';
import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';
import { BarLineComplexChartProps } from './types';
import { BarLineComplexChartInternal } from './BarLineComplexChartInternal';
import { BarLineComplexChartContextProvider } from './BarLIneComplexChart.context';

const BarLineComplexChartComponent = ({
  data,
  lineShape = 'linear',
  maxVisibleBars = 5,
  maxVisibleLines = 3,
  title = 'Bar & Line Complex Chart',
  cardProps,
  features = [],
  isFullscreenModeInitial = false,
  onFullscreenModeChange,
  ...rest
}: BarLineComplexChartProps) => {
  const tooltip = useTooltip();
  const { isFullscreenMode, setFullscreenMode } = useFullscreenMode();

  useEffect(() => {
    onFullscreenModeChange?.(isFullscreenMode);
  }, [isFullscreenMode]);

  useEffect(() => {
    if (isFullscreenModeInitial) {
      setFullscreenMode(isFullscreenModeInitial);
    }
  }, [isFullscreenModeInitial]);
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
