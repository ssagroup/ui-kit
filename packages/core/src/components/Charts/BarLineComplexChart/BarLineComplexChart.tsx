import { BarLineComplexChartProps } from './types';
import { useTooltip } from '@components/Tooltip/useTooltip';
import { TooltipContext } from '@components/Tooltip/useTooltipContext';
import { BarLineComplexChartInternal } from './BarLineComplexChartInternal';

export const BarLineComplexChart = (props: BarLineComplexChartProps) => {
  // TODO: make filtering
  // const showBars = propOr<ChartConfig, boolean>(true, 'showBars')(
  //   chartData,
  // );

  // TODO: make filtering
  // const showLines = propOr<ChartConfig, boolean>(true, 'showLines')(
  //   chartData,
  // );

  const tooltip = useTooltip({});
  // const { xLabels } = useChartInfo(chartData);
  return (
    <TooltipContext.Provider value={tooltip}>
      <BarLineComplexChartInternal {...props} />
    </TooltipContext.Provider>
  );
};
