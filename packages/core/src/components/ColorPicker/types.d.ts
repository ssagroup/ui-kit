// TODO: this is similar to MainColors from types/global.d.ts
// Probably, we should use MainColors here (or at least extend form it)
export interface Colors {
  pink: Interpolation<Theme>;
  yellow: Interpolation<Theme>;
  green: Interpolation<Theme>;
  turquoise: Interpolation<Theme>;
  purple: Interpolation<Theme>;
  blueLight: Interpolation<Theme>;
  blue: Interpolation<Theme>;
}

export interface ColorPickerProps {
  onChange: Dispatch<SetStateAction<string>>;
  initColor?: keyof Colors;
}
