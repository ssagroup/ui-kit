import { createContext, useContext } from 'react';
import { PieChartLegendItem, PieChartProps } from './types';

type ContextType = {
  data: Array<PieChartLegendItem>;
} & Pick<PieChartProps, 'legendOutputType'>;

export const PieChartContext = createContext<ContextType>({
  data: [],
  legendOutputType: 'value',
});

export const PieChartProvider = ({
  children,
  data,
  legendOutputType,
}: {
  children: React.ReactNode;
} & ContextType) => (
  <PieChartContext.Provider
    value={{
      data,
      legendOutputType,
    }}>
    {children}
  </PieChartContext.Provider>
);

export const usePieChartContext = () => {
  return useContext(PieChartContext);
};
