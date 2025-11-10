import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import ColorPickerBase, { Color } from '@rc-component/color-picker';

import DropdownOption from '@components/DropdownOption';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';

import { useColorPickerContext } from '../ColorPickerContext';
import {
  ColorDropdown,
  CopyButton,
  HexInput,
  HlsInput,
  RgbInput,
} from '../components';
import { COLOR_FORMAT } from '../constants';
import { ColorFormat } from '../types';
import { colorFormatter } from '../utils';

export const TabColorPicker = () => {
  const theme = useTheme();
  const {
    rawColor,
    disabled,
    disabledAlpha,
    classnames,
    format,
    copy,
    onChange,
    setFormat,
    setRawColor,
  } = useColorPickerContext();

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
      css={{
        width: '248px',
        boxShadow: 'none',
        padding: 0,
        '& .rc-color-picker-slider-container': {
          paddingLeft: 4,
        },
      }}
      className={classnames?.colorPicker}
      panelRender={(panel) => (
        <>
          {panel}
          <Wrapper
            alignItems="center"
            css={{ justifyContent: 'space-between', gap: 5 }}>
            <ColorDropdown
              className={[
                css`
                  height: 28px;
                `,
                classnames?.colorDropdown,
              ].join(' ')}
              selectedItem={{
                value: COLOR_FORMAT[format],
                id: format,
              }}
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
              }}
              className={classnames?.output}>
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
