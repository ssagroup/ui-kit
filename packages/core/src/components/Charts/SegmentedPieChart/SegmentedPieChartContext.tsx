import { createContext, useContext } from 'react';
import { SegmentedPieChartProps } from './types';

type ContextType = Pick<
  SegmentedPieChartProps,
  | 'renderTitleTooltipContent'
  | 'totalAmount'
  | 'totalDimension'
  | 'titleTooltipOptions'
  | 'legendValueRoundingDigits'
  | 'tooltipConfig'
  | 'showDimensions'
  | 'showPercentage'
  | 'otherLabel'
  | 'currency'
> & {
  legendPercentageRoundingDigits: number;
};

export const SegmentedPieChartContext = createContext<ContextType>({
  totalAmount: 0,
  totalDimension: '',
  legendPercentageRoundingDigits: 0,
});

export const SegmentedPieChartProvider = ({
  children,
  legendPercentageRoundingDigits,
  totalAmount,
  totalDimension,
  titleTooltipOptions,
  showDimensions,
  showPercentage,
  otherLabel,
  currency,
  renderTitleTooltipContent,
}: {
  children: React.ReactNode;
} & ContextType) => (
  <SegmentedPieChartContext.Provider
    value={{
      legendPercentageRoundingDigits,
      totalAmount,
      totalDimension,
      titleTooltipOptions,
      showDimensions,
      showPercentage,
      otherLabel,
      currency,
      renderTitleTooltipContent,
    }}>
    {children}
  </SegmentedPieChartContext.Provider>
);

export const useSegmentedPieChartContext = () => {
  return useContext(SegmentedPieChartContext);
};
