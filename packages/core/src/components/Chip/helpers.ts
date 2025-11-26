import { css, Theme } from '@emotion/react';
import { ChipProps } from './types';
import { filled, outlined, filledDisabled, outlinedDisabled } from './styles';
import { VARIANTS, COLORS } from './constants';

type SemanticColor = Exclude<ChipProps['color'], 'default' | undefined>;
type ColorConfig = { main: string; bg: string };

export const colorMap = (theme: Theme): Record<SemanticColor, ColorConfig> => ({
  primary: {
    main: theme.colors.blue as string,
    bg: theme.colors.blue20 as string,
  },
  success: {
    main: theme.colors.green as string,
    bg: theme.colors.green20 as string,
  },
  error: {
    main: theme.colors.red as string,
    bg: theme.colors.red40 as string,
  },
  info: {
    main: theme.colors.blueLight as string,
    bg: theme.colors.blueLight20 as string,
  },
  warning: {
    main: theme.colors.yellow as string,
    bg: theme.colors.yellow20 as string,
  },
});

const getVariantColorBlock = (
  theme: Theme,
  variant: 'filled' | 'outlined',
  colorConfig: ColorConfig,
  disabled: boolean,
) => {
  if (variant === 'outlined') {
    return css`
      background-color: ${colorConfig.bg};
      border: 1px solid ${colorConfig.main};
      color: ${colorConfig.main};
      ${disabled ? 'opacity: 0.5;' : ''}
    `;
  }

  return css`
    background-color: ${colorConfig.main};
    border: 1px solid ${colorConfig.bg};
    color: ${theme.colors.white};
    ${disabled ? 'opacity: 0.5;' : ''}
  `;
};

export const getVariantColors = (
  theme: Theme,
  variant: ChipProps['variant'],
  color: ChipProps['color'],
  disabled: boolean,
) => {
  const variantKey = variant ?? VARIANTS.FILLED;
  const colorKey = color ?? COLORS.DEFAULT;

  const paletteMap = colorMap(theme);
  const palette =
    colorKey === COLORS.DEFAULT ? null : paletteMap[colorKey as SemanticColor];

  const chipStyles =
    colorKey === COLORS.DEFAULT
      ? variantKey === VARIANTS.OUTLINED
        ? disabled
          ? outlinedDisabled(theme)
          : outlined(theme)
        : disabled
          ? filledDisabled(theme)
          : filled(theme)
      : palette
        ? getVariantColorBlock(theme, variantKey, palette, disabled)
        : variantKey === VARIANTS.OUTLINED
          ? outlined(theme)
          : filled(theme);

  const iconColor = (() => {
    if (!palette) {
      return disabled ? theme.colors.greyDisabled : theme.colors.greyDarker;
    }

    if (variantKey === VARIANTS.OUTLINED) {
      return palette.main;
    }

    return theme.colors.white;
  })();

  return { chipStyles, iconColor };
};
