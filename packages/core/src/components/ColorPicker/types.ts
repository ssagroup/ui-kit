import { Color } from '@rc-component/color-picker';
import { COLOR_FORMAT } from './constants';
import { SmallTabProps, TabProps } from '@components/TabBar/types';

export type ColorFormat = keyof typeof COLOR_FORMAT;

export interface ColorPickerProps {
  defaultColor?: string;
  defaultFormat?: ColorFormat;
  disabledAlpha?: boolean;
  disabled?: boolean;
  color?: string;
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
  'color' | 'format'
> & {
  providedColor: ColorPickerProps['color'];
  providedFormat: ColorPickerProps['format'];
};

export type ColorPickerProviderOutputProps = Omit<ColorPickerProps, 'color'> & {
  rawColor?: string | Color;
  format: ColorFormat;
  copy: (valueToCopy: string) => void;
  setRawColor: (color: string | Color) => void;
  setFormat: (format: ColorFormat) => void;
};

export type ColorPickerTabProps = Pick<
  TabProps,
  'tabId' | 'isActive' | 'ariaControls' | 'onClick'
> &
  Pick<SmallTabProps, 'text'> & {
    isActive?: boolean;
  };
