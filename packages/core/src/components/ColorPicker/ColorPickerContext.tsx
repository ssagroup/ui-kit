import { createContext, useContext } from 'react';

import { Color } from '@rc-component/color-picker';

import { useClipboard, useUncontrolled } from '@ssa-ui-kit/hooks';

import {
  ColorFormat,
  ColorPickerProviderInputProps,
  ColorPickerProviderOutputProps,
} from './types';
import { colorFormatter } from './utils';

export const ColorPickerContext = createContext<ColorPickerProviderOutputProps>(
  {
    format: 'hex',
    rawColor: undefined,
    copy() {
      // no-op
    },
    setFormat() {
      // no-op
    },
    setRawColor() {
      // no-op
    },
  },
);

export const ColorPickerProvider = ({
  children,
  providedColor,
  providedFormat,
  defaultColor,
  defaultFormat,
  classnames,
  disabledAlpha,
  disabled,
  label,
  colorsPalette,
  onChange,
}: React.PropsWithChildren<ColorPickerProviderInputProps>) => {
  const { copy } = useClipboard();

  const [format, setFormat] = useUncontrolled<ColorFormat, unknown[]>({
    value: providedFormat,
    defaultValue: defaultFormat,
    finalValue: 'hex',
  });
  const [rawColor, setRawColor] = useUncontrolled<
    Color | string | undefined,
    unknown[]
  >({
    value: providedColor,
    defaultValue: defaultColor,
    onChange: (color) => {
      if (color) {
        onChange?.(colorFormatter[format](new Color(color)));
      }
    },
  });

  return (
    <ColorPickerContext.Provider
      value={{
        defaultColor,
        defaultFormat,
        format,
        rawColor,
        classnames,
        disabledAlpha,
        disabled,
        label,
        colorsPalette,
        copy,
        setFormat,
        setRawColor,
        onChange,
      }}>
      {children}
    </ColorPickerContext.Provider>
  );
};

export const useColorPickerContext = () => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error(
      'useColorPickerContext must be used within a ColorPickerProvider',
    );
  }
  return context;
};
