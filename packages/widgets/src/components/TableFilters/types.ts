export type CheckboxData = Record<string, string[]>;

export type FiltersNames = 'strategy' | 'status' | 'pairs' | 'exchange';

interface SingleItem {
  key: string;
  name: string;
  isDisabled?: boolean;
  content: {
    statePath: string[];
    text: string;
  };
}

export interface AccordionInfo {
  id: FiltersNames;
  title: string;
  isOpened: boolean;
  ariaControls: string;
  isDisabled?: boolean;
  items: Record<string, SingleItem>;
  selectedItems: string[];
  selectedItemsDraft?: string[];
}

export type TableFilterConfig = Record<FiltersNames, AccordionInfo>;

export interface TableFiltersView {
  initialState?: TableFilterConfig;
  setConfig?: (config: TableFilterConfig) => void;
  handleCancel?: () => void;
  handleClear?: () => void;
  handleSubmit?: (checkboxData: TableFilterConfig) => void;
}
