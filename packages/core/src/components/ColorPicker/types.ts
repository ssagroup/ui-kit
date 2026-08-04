import { Color } from '@rc-component/color-picker';
import { SmallTabProps, TabProps } from '@components/TabBar/types';
import { COLOR_FORMAT } from './constants';

export type ColorFormat = keyof typeof COLOR_FORMAT;

export interface ColorPickerProps {
  /**
   * Controlled colour value. When provided, the parent owns the value.
   */
  value?: string;

  /**
   * Initial colour value, for uncontrolled mode.
   */
  defaultValue?: string;

  /**
   * @deprecated Use `defaultValue` instead. Removed in the next major release.
   */
  defaultColor?: string;

  /**
   * @deprecated Use `value` instead. Removed in the next major release.
   */
  color?: string;

  defaultFormat?: ColorFormat;
  disabledAlpha?: boolean;
  disabled?: boolean;
  format?: ColorFormat;
  label?: string;
  colorsPalette?: string[];
  classnames?: {
    trigger?: string;
    content?: string;
    button?: string;
    colorPicker?: string;
    colorDropdown?: string;
    output?: string;
  };
  onChange?: (color: string) => void;
}

export type ColorPickerProviderInputProps = Omit<
  ColorPickerProps,
  'color' | 'value' | 'defaultValue' | 'format'
> & {
  providedColor: ColorPickerProps['value'];
  providedFormat: ColorPickerProps['format'];
};

export type ColorPickerProviderOutputProps = Omit<
  ColorPickerProps,
  'color' | 'value' | 'defaultValue'
> & {
  rawColor?: string | Color;
  format: ColorFormat;
  copy: (valueToCopy: string) => void;
  setRawColor: (color: string | Color) => void;
  setFormat: (format: ColorFormat) => void;
};

export type ColorPickerTabProps = Pick<
  TabProps,
  'tabId' | 'isActive' | 'aria-controls' | 'onClick'
> &
  Pick<SmallTabProps, 'text'> & {
    isActive?: boolean;
  };
