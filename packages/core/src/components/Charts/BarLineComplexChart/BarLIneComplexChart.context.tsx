import { createContext, useContext, useEffect, useState } from 'react';
import {
  BarLineComplexChartPContextProps,
  BarLineComplexChartPContextProviderProps,
  ChartItem,
} from './types';

const BarLineComplexChartContext =
  createContext<BarLineComplexChartPContextProps>({
    filteredData: [],
    data: [],
    lineShape: undefined,
    maxVisibleBars: 5,
    maxVisibleLines: 3,
    setFilteredData: () => {
      // no-op
    },
    setData: () => {
      // no-op
    },
  });

export const useBarLineComplexChartContext = () =>
  useContext(BarLineComplexChartContext);

export const BarLineComplexChartContextProvider = ({
  children,
  lineShape,
  maxVisibleBars,
  maxVisibleLines,
  data: initialData = [],
}: BarLineComplexChartPContextProviderProps) => {
  const [data, setData] = useState<ChartItem[]>(initialData);
  const [filteredData, setFilteredData] = useState<ChartItem[]>([]);

  useEffect(() => {
    const filtered = data.filter((item) => item.selected);
    setFilteredData(filtered);
  }, [data]);
  return (
    <BarLineComplexChartContext.Provider
      value={{
        data,
        lineShape,
        maxVisibleBars,
        maxVisibleLines,
        filteredData,
        setData,
        setFilteredData,
      }}>
      {children}
    </BarLineComplexChartContext.Provider>
  );
};