import { CommonProps } from '@global-types/emotion';

export type DropdownOptionProps = Record<string, string | number>;

export interface DropdownItemsListProps extends CommonProps {
  ariaLabelledby?: string;
  id?: string;
  children?: React.ReactNode;
}
