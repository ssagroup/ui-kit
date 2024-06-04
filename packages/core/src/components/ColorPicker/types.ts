import { Dispatch, SetStateAction } from 'react';
import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { Theme } from '../..';

export type ColorsList =
  | 'pink'
  | 'yellow'
  | 'green'
  | 'turquoise'
  | 'purple'
  | 'blueLight'
  | 'blue';

// TODO: this is similar to MainColors from types/global.d.ts
// Probably, we should use MainColors here (or at least extend form it)
export type Colors = Record<ColorsList, (theme: Theme) => SerializedStyles>;

export interface ColorPickerProps extends CommonProps {
  onChange: Dispatch<SetStateAction<ColorsList>>;
  initColor?: ColorsList;
}
