import { css, SerializedStyles, Theme } from '@emotion/react';
import { focusOutline } from '@styles/safari-focus-outline';
import { ButtonVariants } from './types';

export const buttonBlock = css`
  display: grid;

  span {
    display: inline-block;
    margin: auto;
  }
`;

export const iconWrapperRight = css`
  display: inline-flex;
  margin-right: 6px;
`;

export const iconWrapperLeft = css`
  display: inline-flex;
  margin-left: 6px;
`;

export const sizeStyles: MainSizes = {
  large: css`
    height: 54px;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.8px;
    padding: 0 32px;
  `,
  medium: css`
    height: 46px;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.8px;
    padding: 0 24px;
  `,
  small: css`
    height: 36px;
    font-size: 13.33px;
    font-weight: 400;
    letter-spacing: 0.8px;
    padding: 0 16px;
  `,
};

type SolidVariantKey = Exclude<keyof ButtonVariants, 'tertiary'>;

const makeSolidVariant = (
  theme: Theme,
  key: SolidVariantKey,
  extra?: SerializedStyles,
) => {
  const { main, dark, light } = theme.palette[key];
  return css`
    color: ${theme.colors.white};
    background: ${main};

    &:hover {
      background: ${dark};
    }

    &:active {
      background: ${dark};
    }

    &:disabled {
      background: ${theme.colors.grey};
    }

    &:focus {
      background: ${light};
    }

    ${extra}
  `;
};

export const variantStyles: ButtonVariants = {
  primary: (theme) =>
    makeSolidVariant(
      theme,
      'primary',
      css`
        &:not(:disabled):hover,
        &:not(:disabled):active,
        &:not(:disabled):focus {
          box-shadow: -4px 4px 14px ${theme.colors.blue20};
        }
      `,
    ),

  secondary: (theme) =>
    makeSolidVariant(
      theme,
      'secondary',
      css`
        color: ${theme.colors.greyDarker};

        &:not(:disabled) {
          box-shadow: 0 10px 40px ${theme.colors.greyShadow};
        }

        &:not(:disabled):hover {
          box-shadow: 0 10px 40px ${theme.colors.greyShadowHover};
        }
      `,
    ),

  tertiary: (theme) => css`
    background: transparent;

    ${focusOutline(theme, 'greyOutline')}
  `,

  error: (theme) => makeSolidVariant(theme, 'error'),

  warning: (theme) => makeSolidVariant(theme, 'warning'),

  success: (theme) => makeSolidVariant(theme, 'success'),
};
