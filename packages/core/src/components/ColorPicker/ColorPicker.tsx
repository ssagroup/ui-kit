import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import ColorPickerBase, { Color } from '@rc-component/color-picker';
import { useClipboard, useUncontrolled } from '@ssa-ui-kit/hooks';
import Wrapper from '@components/Wrapper';
import Icon from '@components/Icon';
import DropdownOption from '@components/DropdownOption';
import {
  ColorDropdown,
  CopyButton,
  HexInput,
  HlsInput,
  RgbInput,
} from './components';

import '@rc-component/color-picker/assets/index.css';

const COLOR_FORMAT = {
  hex: 'HEX',
  rgb: 'RGB',
  hsl: 'HSL',
} as const;
type ColorFormat = keyof typeof COLOR_FORMAT;

export interface ColorPickerProps {
  defaultColor?: string;
  color?: string;
  disabledAlpha?: boolean;
  disabled?: boolean;
  format?: ColorFormat;
  defaultFormat?: ColorFormat;
  onChange?: (color: string) => void;
}

const colorFormatter: Record<ColorFormat, (color: Color) => string> = {
  hex: (color) => color.toHexString(),
  rgb: (color) => color.toRgbString(),
  hsl: (color) => color.toHslString(),
};

export const ColorPicker = ({
  color: providedColor,
  defaultColor,
  disabledAlpha,
  disabled,
  format: providedFormat,
  defaultFormat,
  onChange,
}: ColorPickerProps) => {
  const theme = useTheme();
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
  const { copy } = useClipboard();

  const parsedColor = rawColor ? new Color(rawColor) : undefined;

  const handleFormatSelect = (format: ColorFormat) => {
    onChange?.(colorFormatter[format](new Color(rawColor!)));
    setFormat(format);
  };

  const Input: Record<ColorFormat, () => React.ReactNode> = {
    hex: () => <HexInput color={rawColor} onChange={setRawColor} />,
    rgb: () => <RgbInput color={rawColor} onChange={setRawColor} />,
    hsl: () => <HlsInput color={rawColor} onChange={setRawColor} />,
  };

  return (
    <ColorPickerBase
      value={rawColor}
      onChange={setRawColor}
      disabledAlpha={disabledAlpha}
      disabled={disabled}
      css={{ width: '280px' }}
      panelRender={(panel) => (
        <>
          {panel}
          <Wrapper
            alignItems="center"
            css={{ justifyContent: 'space-between', gap: 5 }}>
            <ColorDropdown
              className={css`
                height: 28px;
              `}
              selectedItem={{ value: COLOR_FORMAT[format], id: format }}
              onChange={(selected) =>
                handleFormatSelect(selected.id as typeof format)
              }>
              {Object.entries(COLOR_FORMAT).map(([key, value]) => (
                <DropdownOption key={key} id={key} value={value} />
              ))}
            </ColorDropdown>
            <div
              css={{
                border: '1px solid',
                borderColor: theme.colors.grey,
                borderRadius: '8px',
                overflow: 'hidden',
                alignSelf: 'stretch',
              }}>
              {Input[format]()}
            </div>
            <CopyButton
              variant="tertiary"
              isDisabled={!parsedColor || !parsedColor.isValid}
              onClick={() => copy(colorFormatter[format](parsedColor!))}>
              <Icon name="copy" size={14} color={theme.colors.greyFilterIcon} />
            </CopyButton>
          </Wrapper>
        </>
      )}
    />
  );
};
