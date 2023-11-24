import { SerializedStyles } from '@emotion/react';

export type ButtonGroupItem = {
  id: string | number;
  text: string;
  isDisabled?: boolean;
};

export interface ButtonGroupProps {
  items: Array<ButtonGroupItem>;
  selectedItem?: ButtonGroupItem;
  onClick: (item: ButtonGroupItem) => void;
  buttonStyles?: SerializedStyles;
}
