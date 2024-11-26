import { createContext, useContext, useEffect, useState } from 'react';
import {
  BarLineComplexChartPContextProps,
  BarLineComplexChartPContextProviderProps,
  BarLineChartItem,
} from './types';

const BarLineComplexChartContext =
  createContext<BarLineComplexChartPContextProps>({
    filteredData: [],
    data: [],
    lineShape: undefined,
    maxVisibleBars: 5,
    maxVisibleLines: 3,
    selected: [],
    setFilteredData: () => {
      // no-op
    },
    setData: () => {
      // no-op
    },
    setSelected: () => {
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
  const [data, setData] = useState<BarLineChartItem[]>(initialData);
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [filteredData, setFilteredData] = useState<BarLineChartItem[]>([]);

  useEffect(() => {
    const filtered = data.filter((item) => item.selected);
    const selectedNames = filtered
      .map((item) => item.name)
      .filter((item) => item !== undefined);
    setFilteredData(filtered);
    setSelected(selectedNames);
  }, [data]);

  useEffect(() => {
    const filtered = data.filter((item) => selected.includes(item.name || ''));
    setFilteredData(filtered);
  }, [selected]);

  return (
    <BarLineComplexChartContext.Provider
      value={{
        data,
        lineShape,
        maxVisibleBars,
        maxVisibleLines,
        filteredData,
        selected,
        setData,
        setFilteredData,
        setSelected,
      }}>
      {children}
    </BarLineComplexChartContext.Provider>
  );
};
