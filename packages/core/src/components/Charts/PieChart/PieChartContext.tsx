import { createContext, useContext } from 'react';
import { PieChartLegendItem } from './types';

type ContextType = {
  data: Array<PieChartLegendItem>;
};

export const PieChartContext = createContext<ContextType>({
  data: [],
});

export const PieChartProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
} & ContextType) => (
  <PieChartContext.Provider
    value={{
      data,
    }}>
    {children}
  </PieChartContext.Provider>
);

export const usePieChartContext = () => {
  return useContext(PieChartContext);
};
