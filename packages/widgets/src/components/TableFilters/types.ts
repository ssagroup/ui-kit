export type CheckboxData = Record<string, string[]>;

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
