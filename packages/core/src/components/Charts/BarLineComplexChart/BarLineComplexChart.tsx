import { BarLineComplexChartProps } from './types';
import { useTooltip } from '@components/Tooltip/useTooltip';
import { TooltipContext } from '@components/Tooltip/useTooltipContext';
import { BarLineComplexChartInternal } from './BarLineComplexChartInternal';
import { BarLineComplexChartContextProvider } from './BarLIneComplexChart.context';

export const BarLineComplexChart = ({
  data,
  lineShape = 'linear',
  maxVisibleBars = 5, // need to be implemented
  maxVisibleLines = 3, // need to be implemented
  ...rest
}: BarLineComplexChartProps) => {
  const tooltip = useTooltip({});
  return (
    <BarLineComplexChartContextProvider
      data={data}
      lineShape={lineShape}
      maxVisibleBars={maxVisibleBars}
      maxVisibleLines={maxVisibleLines}>
      <TooltipContext.Provider value={tooltip}>
        <BarLineComplexChartInternal {...rest} />
      </TooltipContext.Provider>
    </BarLineComplexChartContextProvider>
  );
};
