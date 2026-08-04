import { css, keyframes, SerializedStyles, Theme } from '@emotion/react';
import { ButtonVariants } from './types';

// Centring lives in the keyframes because `transform` is doing both jobs.
const spin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
`;

/**
 * Keeps the button at its resting width while loading: the real content stays
 * in the layout but is hidden, and the spinner is centred over it.
 *
 * `display: contents` leaves the children as direct flex items of the button,
 * so the loading state measures exactly the same as the resting state.
 * `&&` outweighs `buttonBlock`'s `span { … }` rule in block mode.
 */
export const loadingContent = css`
  && {
    display: contents;
    visibility: hidden;
  }
`;

export const loadingSpinner = css`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    margin: 0;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${spin} 0.7s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    && {
      animation-duration: 2.4s;
    }
  }
`;

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

type SolidVariantKey = Exclude<keyof ButtonVariants, 'tertiary' | 'custom'>;

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

/** Transparent variant (no focus outline). Shared by custom (recommended) and tertiary (legacy). */
const transparentVariant = () => css`
  background: transparent;
`;

export const variantStyles: ButtonVariants = {
  custom: transparentVariant,

  primary: (theme) => makeSolidVariant(theme, 'primary'),

  secondary: (theme) =>
    makeSolidVariant(
      theme,
      'secondary',
      css`
        color: ${theme.colors.greyDarker};
      `,
    ),

  tertiary: transparentVariant,

  error: (theme) => makeSolidVariant(theme, 'error'),

  warning: (theme) => makeSolidVariant(theme, 'warning'),

  success: (theme) => makeSolidVariant(theme, 'success'),
};
