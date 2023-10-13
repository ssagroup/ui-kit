import { Interpolation } from '@emotion/react';
import { CommonProps, Theme } from '../..';
import { Dispatch, SetStateAction } from 'react';

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
export type Colors = Record<ColorsList, Interpolation<Theme>>;

export interface ColorPickerProps extends CommonProps {
  onChange: Dispatch<SetStateAction<ColorsList>>;
  initColor?: ColorsList;
}
