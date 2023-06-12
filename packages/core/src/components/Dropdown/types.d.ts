export interface IDropdownItemProp {
  id: string | number;
  val: string;
}

export interface IDropdownLargeItemProp extends IDropdownItemProp {
  extraVal: string;
}

export interface ITemplateProps {
  children?: React.ReactNode;
  colors?: Array<string | undefined>;
}

export interface ISmallTemplateProps extends ITemplateProps {
  item: IDropdownItemProp;
}

export interface ILargeTemplateProps extends ITemplateProps {
  item: IDropdownLargeItemProp;
}

export interface IDropdownProps<P extends IDropdownItemProp> {
  itemTemplate: React.FC<{
    item: P;
    children?: React.ReactNode;
    colors?: Array<string | undefined>;
    [otherProp: string]: unknown;
  }>;
  items: Array<P>;
  selectedItem?: P;
  onChange: (item: P) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export interface IDropdownToggleProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  isOpen: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabelledby?: string;
  ariaControls?: string;
}

export type SmallDropdownPropsType = Pick<
  IDropdownProps<IDropdownItemProp>,
  'items' | 'selectedItem' | 'onChange' | 'isDisabled' | 'placeholder'
>;

export type LargeDropdownPropsType = Pick<
  IDropdownProps<IDropdownLargeItemProp>,
  'items' | 'selectedItem' | 'onChange' | 'isDisabled' | 'placeholder'
>;

export interface IDropdownItemProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isActive: boolean;
  children?: React.NodeType;
  noHover?: boolean;
}

export interface IDropdownItemsListProps<T extends IDropdownItemProp> {
  itemTemplate: React.FC<{
    item: P;
    children?: React.ReactNode;
    [otherProp: string]: unknown;
  }>;
  items: Array<T>;
  activeItem?: T;
  onChange: (arg: T | null) => void;
  ariaLabelledby?: string;
  id: string;
}
