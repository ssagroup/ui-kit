import { css, Theme } from '@emotion/react';

import { focusOutline } from '@styles/safari-focus-outline';

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

export const large = css`
  height: 54px;

  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.8px;

  padding: 0 32px;
`;

export const medium = css`
  height: 46px;

  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.8px;

  padding: 0 24px;
`;

export const small = css`
  height: 36px;

  font-size: 13.33px;
  font-weight: 400;
  letter-spacing: 0.8px;

  padding: 0 16px;
`;

export const primary = (theme: Theme) => css`
  color: ${theme.colors.white};
  background: linear-gradient(
    108.3deg,
    ${theme.colors.greyDarker} -0.36%,
    ${theme.colors.greyDark} 100%
  );

  &:hover {
    background: linear-gradient(
      108.3deg,
      ${theme.colors.greyButtonGradient} -0.36%,
      ${theme.colors.greyButtonGradientLight} 100%
    );
    box-shadow: -4px 4px 14px ${theme.colors.greyDarker14};
  }

  &:active {
    background: ${theme.colors.greyDarker};
    box-shadow: -4px 4px 14px ${theme.colors.greyDarker14};
  }

  &:disabled {
    background: ${theme.colors.grey};
  }

  &:focus {
    background: linear-gradient(
      108.3deg,
      ${theme.colors.greyBackground} -0.36%,
      ${theme.colors.greyBackgroundLight} 100%
    );
    box-shadow: -4px 4px 14px ${theme.colors.greyDarker14};
  }
`;

export const info = (theme: Theme) => css`
  color: ${theme.colors.white};
  background: linear-gradient(
    247deg,
    ${theme.colors.blueLighter} 14.71%,
    ${theme.colors.blue} 85.29%
  );

  &:hover {
    background: linear-gradient(
      247deg,
      ${theme.colors.blueButtonHoverGradientFrom} 14.71%,
      ${theme.colors.blueButtonHoverGradientTo} 85.29%
    );
  }

  &:active {
    background: ${theme.colors.blueButtonActive};
  }

  &:disabled {
    background: ${theme.colors.grey};
  }
`;

export const secondary = (theme: Theme) => css`
  background: ${theme.colors.greyLighter};
  box-shadow: 0px 10px 40px ${theme.colors.greyShadow};

  &:hover {
    background: ${theme.colors.white};
    box-shadow: 0px 10px 40px ${theme.colors.greyShadowHover};
  }

  &:active {
    background: ${theme.colors.greyFocused};
    box-shadow: 0px 10px 40px ${theme.colors.greyShadow};
  }

  &:disabled {
    background: ${theme.colors.grey};
    box-shadow: 0px 10px 40px ${theme.colors.greyShadow};
  }

  &:focus {
    background: ${theme.colors.greySelectedMenuItem};
    box-shadow: 0px 10px 40px ${theme.colors.greyShadow};
  }
`;

export const tertiary = (theme: Theme) => css`
  background: transparent;

  ${focusOutline(theme, 'greyOutline')}
`;

export const attention = (theme: Theme) => css`
  color: ${theme.colors.white};
  background: linear-gradient(
    99.26deg,
    ${theme.colors.pink} -7.01%,
    ${theme.colors.pinkLighter} 92.87%
  );

  &:hover {
    background: linear-gradient(
      99.26deg,
      ${theme.colors.pinkDark} 7.01%,
      ${theme.colors.pinkDarker} 92.87%
    );
  }

  &:active {
    background: ${theme.colors.pinkDark};
  }

  &:disabled {
    background: ${theme.colors.grey};
  }
`;
