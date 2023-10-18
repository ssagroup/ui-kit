import { SerializedStyles } from '@emotion/react';

export type ButtonGroupItem = {
  id: number;
  text: string;
};

export interface ButtonGroupProps {
  items: Array<ButtonGroupItem>;
  onClick: (item: ButtonGroupItem) => void;
  buttonStyles?: SerializedStyles;
}
