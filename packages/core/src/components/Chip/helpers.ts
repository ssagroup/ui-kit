import { css, Theme } from '@emotion/react';
import { ChipProps } from './types';
import { filled, outlined, filledDisabled, outlinedDisabled } from './styles';
import { VARIANTS, COLORS, OUTLINED_BG_OPACITY } from './constants';

type SemanticColor = Exclude<ChipProps['color'], 'default' | undefined>;

type ColorConfig = {
  /** Solid background for filled variant / border + text for outlined */
  main: string;
  /** Light background for outlined variant */
  bg: string;
  /** Darkest shade — used as text color in outlined variant */
  dark: string;
  /** When true, filled variant uses dark text instead of white (e.g. light grey bg) */
  darkText?: boolean;
};

export const colorMap = (theme: Theme): Record<SemanticColor, ColorConfig> => ({
  primary: {
    main: theme.palette.primary.main as string,
    bg: theme.palette.primary.light as string,
    dark: theme.palette.primary.dark as string,
  },
  secondary: {
    main: theme.palette.secondary.main as string,
    bg: theme.palette.secondary.light as string,
    dark: theme.palette.secondary.dark as string,
    darkText: true,
  },
  success: {
    main: theme.palette.success.main as string,
    bg: theme.palette.success.light as string,
    dark: theme.palette.success.dark as string,
  },
  error: {
    main: theme.palette.error.main as string,
    bg: theme.palette.error.light as string,
    dark: theme.palette.error.dark as string,
  },
  warning: {
    main: theme.palette.warning.main as string,
    bg: theme.palette.warning.light as string,
    dark: theme.palette.warning.dark as string,
  },
});

const getVariantColorBlock = (
  theme: Theme,
  variant: 'filled' | 'outlined',
  config: ColorConfig,
  disabled: boolean,
  isClickable: boolean,
) => {
  if (variant === VARIANTS.OUTLINED) {
    const bgDefault = `color-mix(in srgb, ${config.bg} ${OUTLINED_BG_OPACITY.DEFAULT * 100}%, transparent)`;
    const bgHover = `color-mix(in srgb, ${config.bg} ${OUTLINED_BG_OPACITY.HOVER * 100}%, transparent)`;
    const bgActive = `color-mix(in srgb, ${config.bg} ${OUTLINED_BG_OPACITY.ACTIVE * 100}%, transparent)`;
    const bgDisabled = `color-mix(in srgb, ${config.bg} ${OUTLINED_BG_OPACITY.DISABLED * 100}%, transparent)`;

    return css`
      background-color: ${disabled ? bgDisabled : bgDefault};
      border: 1px solid ${config.main};
      color: ${config.dark};
      transition: background-color 0.2s ease;
      ${disabled ? 'opacity: 0.5;' : ''}
      ${!disabled && isClickable
        ? `
        &:hover {
          background-color: ${bgHover};
        }
        &:active {
          background-color: ${bgActive};
        }
      `
        : ''}
    `;
  }

  return css`
    background-color: ${config.main};
    border: 1px solid ${config.main};
    color: ${config.darkText ? theme.colors.greyDarker : theme.colors.white};
    ${disabled ? 'opacity: 0.5;' : ''}
  `;
};

export const getVariantColors = (
  theme: Theme,
  variant: ChipProps['variant'],
  color: ChipProps['color'],
  disabled: boolean,
  isClickable = false,
) => {
  const variantKey = variant ?? VARIANTS.FILLED;
  const colorKey = color ?? COLORS.DEFAULT;

  if (colorKey === COLORS.DEFAULT) {
    const chipStyles =
      variantKey === VARIANTS.OUTLINED
        ? disabled
          ? outlinedDisabled(theme)
          : outlined(theme)
        : disabled
          ? filledDisabled(theme)
          : filled(theme);

    return {
      chipStyles,
      iconColor: disabled ? theme.colors.greyDisabled : theme.colors.greyDarker,
    };
  }

  const palette = colorMap(theme)[colorKey as SemanticColor];
  const chipStyles = getVariantColorBlock(
    theme,
    variantKey,
    palette,
    disabled,
    isClickable,
  );

  const iconColor = (() => {
    if (variantKey === VARIANTS.OUTLINED) return palette.dark;
    return palette.darkText
      ? theme.colors.greyDarker
      : (theme.colors.white as string);
  })();

  return { chipStyles, iconColor };
};
