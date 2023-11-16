export type CheckboxData = Record<string, string[]>;
export type NotChangedData = Record<string, Record<string, boolean>>;

export interface SingleItem {
  key: string;
  name: string;
  isDisabled?: boolean;
  content: {
    statePath: string[];
    text: string;
  };
}

export interface AccordionInfo {
  id: string;
  title: string;
  isOpened: boolean;
  ariaControls: string;
  isDisabled?: boolean;
  items: Record<string, SingleItem>;
  selectedItems: string[];
  selectedItemsDraft?: string[];
}

export type TableFilterConfig = Record<string, AccordionInfo>;

export interface TableFiltersView {
  onReset?: () => void;
  onClear?: () => void;
  onSubmit?: () => void;
  handleCheckboxToggle?: (groupName: string, name: string) => void;
  handleMoreButtonVisibleChange?: (isVisible: boolean) => void;
  checkboxData?: TableFilterConfig;
}
