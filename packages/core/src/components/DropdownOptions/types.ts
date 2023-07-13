export type IDropdownOption = Record<string, string | number>;

export interface IDropdownItemsListProps {
  ariaLabelledby?: string;
  id?: string;
  children?: React.ReactNode;
}
