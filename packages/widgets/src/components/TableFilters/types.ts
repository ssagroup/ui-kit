import { BaseSyntheticEvent } from 'react';

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
  checkboxData?: TableFilterConfig;
  selectedItemsByGroup: Record<string, string[]>;
  selectedGroupsCount: number;
  // wrapperRef?: React.RefObject<HTMLElement>;
  // refsByKey?: Record<string, HTMLElement | null>;
  handleCheckboxToggle: (groupName: string, name: string) => () => void;
  setConfig?: (config: TableFilterConfig) => void;
  onReset?: () => void;
  onClear?: () => void;
  onSubmit?: (event: BaseSyntheticEvent) => void;
}
