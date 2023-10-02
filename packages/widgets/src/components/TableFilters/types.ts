export type CheckboxData = Record<string, Record<string, boolean>>;

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
  id: string;
  title: string;
  isOpened: boolean;
  ariaControls: string;
  items: SingleItem[];
}

export interface TableFiltersView {
  handleCancel?: () => void;
  handleClear?: () => void;
  handleSubmit?: (checkboxData: CheckboxData) => void;
  initialState?: CheckboxData;
  data: AccordionInfo[];
}
