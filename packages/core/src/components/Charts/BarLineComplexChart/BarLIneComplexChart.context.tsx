import { createContext, useContext, useEffect, useState } from 'react';
import {
  BarLineComplexChartContextProps,
  BarLineComplexChartContextProviderProps,
  BarLineChartItem,
} from './types';

const BarLineComplexChartContext =
  createContext<BarLineComplexChartContextProps>({
    filteredData: [],
    data: [],
    lineShape: undefined,
    maxVisibleBars: 5,
    maxVisibleLines: 3,
    isMaxBarsSelected: false,
    isMaxLinesSelected: false,
    selected: [],
    barsSelected: [],
    linesSelected: [],
    features: [],
    setFilteredData: () => {
      // no-op
    },
    setData: () => {
      // no-op
    },
    setBarsSelected: () => {
      // no-op
    },
    setLinesSelected: () => {
      // no-op
    },
  });

export const useBarLineComplexChartContext = () =>
  useContext(BarLineComplexChartContext);

export const BarLineComplexChartContextProvider = ({
  children,
  lineShape,
  maxVisibleBars = 5,
  maxVisibleLines = 3,
  features = [],
  data: initialData = [],
}: BarLineComplexChartContextProviderProps) => {
  const [data, setData] = useState<BarLineChartItem[]>(initialData);
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [barsSelected, setBarsSelected] = useState<Array<string | number>>([]);
  const [linesSelected, setLinesSelected] = useState<Array<string | number>>(
    [],
  );
  const [isMaxBarsSelected, setIsMaxBarsSelected] = useState(false);
  const [isMaxLinesSelected, setIsMaxLinesSelected] = useState(false);
  const [filteredData, setFilteredData] = useState<BarLineChartItem[]>([]);

  useEffect(() => {
    const filtered = data.filter((item) => item.selected);
    const selectedBarNames = filtered
      .filter((item) => item.type === 'bar' && typeof item.name !== 'undefined')
      .map((item) => item.name) as string[];
    const selectedOtherNames = filtered
      .filter((item) => item.type !== 'bar' && item.name !== undefined)
      .map((item) => item.name) as string[];

    const removedItems: string[] = [];

    if (selectedBarNames.length > maxVisibleBars) {
      const removed = selectedBarNames.splice(
        maxVisibleBars,
        selectedBarNames.length - maxVisibleBars,
      );
      removedItems.push(...removed);
    }
    if (selectedOtherNames.length > maxVisibleLines) {
      const removed = selectedOtherNames.splice(
        maxVisibleLines,
        selectedOtherNames.length - maxVisibleLines,
      );
      removedItems.push(...removed);
    }
    const newSelected = [...selectedBarNames, ...selectedOtherNames];
    const filteredDataWithoutRemoved = filtered.filter(
      (item) => !removedItems.includes(item.name || ''),
    );

    setFilteredData(filteredDataWithoutRemoved);
    setBarsSelected(selectedBarNames);
    setLinesSelected(selectedOtherNames);
    if (removedItems.length > 0) {
      const newData = data.map(
        (item) =>
          ({
            ...item,
            selected: newSelected.includes(item.name || ''),
          }) as BarLineChartItem,
      );
      setData(newData);
    }
  }, [data]);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        barsSelected.includes(item.name || '') ||
        linesSelected.includes(item.name || ''),
    );
    setFilteredData(filtered);
    setSelected([...barsSelected, ...linesSelected]);
    setIsMaxBarsSelected(barsSelected.length >= maxVisibleBars);
    setIsMaxLinesSelected(linesSelected.length >= maxVisibleLines);
  }, [barsSelected, linesSelected]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <BarLineComplexChartContext.Provider
      value={{
        data,
        lineShape,
        isMaxBarsSelected,
        isMaxLinesSelected,
        maxVisibleBars,
        maxVisibleLines,
        filteredData,
        selected,
        barsSelected,
        linesSelected,
        features,
        setData,
        setFilteredData,
        setBarsSelected,
        setLinesSelected,
      }}>
      {children}
    </BarLineComplexChartContext.Provider>
  );
};
