import { css, Theme, useTheme } from '@emotion/react';
import { ChipProps } from './types';
import { filled, outlined, filledDisabled, outlinedDisabled } from './styles';
import { VARIANTS, COLORS } from './constants';

export const colorMap = (theme: Theme) => ({
  primary: theme.colors.blueRoyal,
  success: theme.colors.greenLighter,
  error: theme.colors.red,
  info: theme.colors.blueLight,
  warning: theme.colors.yellow,
});

export const makeFilled = (theme: Theme, color: string) => css`
  background-color: ${color};
  color: ${theme.colors.white};
  border: none;
`;

export const makeOutlined = (theme: Theme, color: string) => css`
  background-color: ${theme.colors.white};
  border: 1px solid ${color};
  color: ${color};
`;

export const getVariantColorStyles = (
  theme: Theme,
  variant: 'filled' | 'outlined',
  colorName: 'primary' | 'success' | 'error' | 'info' | 'warning',
) => {
  const colors = colorMap(theme);
  const color = colors[colorName];

  if (!color) {
    return variant === 'outlined' ? outlined(theme) : filled(theme);
  }

  return variant === 'outlined'
    ? makeOutlined(theme, color)
    : makeFilled(theme, color);
};

export const getVariantStyles = (
  variant: ChipProps['variant'],
  color: ChipProps['color'],
  disabled: boolean,
  theme: ReturnType<typeof useTheme>,
) => {
  if (disabled) {
    return variant === VARIANTS.OUTLINED
      ? outlinedDisabled(theme)
      : filledDisabled(theme);
  }

  const variantKey = variant ?? VARIANTS.FILLED;
  const colorKey = color ?? COLORS.DEFAULT;

  if (colorKey === COLORS.DEFAULT) {
    return variantKey === VARIANTS.OUTLINED ? outlined(theme) : filled(theme);
  }

  return getVariantColorStyles(
    theme,
    variantKey,
    colorKey as 'primary' | 'success' | 'error' | 'info' | 'warning',
  );
};
