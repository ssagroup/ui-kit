import { useState } from 'react';
import { TableFilterConfig } from '../types';

type TableStateFunctionParam = (data: TableFilterConfig) => TableFilterConfig;

export const useTableDataState = (): [
  TableFilterConfig,
  React.Dispatch<React.SetStateAction<TableFilterConfig>>,
] => {
  const [checkboxData, setCheckboxData] = useState({} as TableFilterConfig);

  const setTableState = (
    value: TableFilterConfig | TableStateFunctionParam,
  ) => {
    setCheckboxData((prevValue) =>
      typeof value === 'function' ? value(prevValue) : value,
    );
  };

  return [checkboxData, setTableState];
};
