import styled from '@emotion/styled';
import {
  type CounterVariants,
  VariantStyle,
  CounterSizes,
  CounterVariants as CounterVariantsEnum,
} from './types';
import { css, Theme, SerializedStyles } from '@emotion/react';
import { ColorsKeys } from '@global-types/emotion';

/** Resolves a variant key to its `theme.palette` background + white text. */
const makeVariantStyle = (theme: Theme, key: CounterVariants) => css`
  color: ${theme.colors.white};
  background: ${theme.palette[key].main};
`;

export const variantStyles: VariantStyle = {
  primary: (theme) => makeVariantStyle(theme, CounterVariantsEnum.primary),
  secondary: (theme) => makeVariantStyle(theme, CounterVariantsEnum.secondary),
  error: (theme) => makeVariantStyle(theme, CounterVariantsEnum.error),
  warning: (theme) => makeVariantStyle(theme, CounterVariantsEnum.warning),
  success: (theme) => makeVariantStyle(theme, CounterVariantsEnum.success),
};

export const sizeStyles: CounterSizes = {
  tiny: css`
    width: 8px;
    height: 8px;
  `,
  small: css`
    height: 24px;
    font-size: 12px;
    padding: 4px 9px;
  `,
  medium: css`
    padding: 4px 13px;
    height: 32px;
    font-size: 14px;
  `,
  large: css`
    font-size: 16px;
    height: 44px;
    padding: 4px 19px;
  `,
};

/**
 * Builds a background override from a `color` string.
 * If `color` matches a key in `theme.colors` the design token is used;
 * otherwise the value is passed through as a raw CSS color string.
 */
export const makeColorOverride = (
  theme: Theme,
  color: ColorsKeys | string,
): SerializedStyles => css`
  background: ${color in theme.colors
    ? theme.colors[color as ColorsKeys]
    : color};
`;

export const CounterBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font: inherit;
  border-radius: 50px;
  font-family: Manrope, sans-serif;
  width: min-content;
  font-style: normal;
  font-weight: 700;
`;
