import { SerializedStyles } from '@emotion/react';

export type Item = {
  id: number;
  text: string;
};

export interface ButtonGroupProps {
  items: Array<Item>;
  onClick: (item: Item) => void;
  className?: SerializedStyles;
}
