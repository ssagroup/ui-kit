import { Color } from '@rc-component/color-picker';

import { ColorFormat } from './types';

export const colorFormatter: Record<ColorFormat, (color: Color) => string> = {
  hex: (color) => color.toHexString(),
  rgb: (color) => color.toRgbString(),
  hsl: (color) => color.toHslString(),
};
