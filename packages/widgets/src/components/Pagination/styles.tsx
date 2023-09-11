import { css, Theme } from '@emotion/react';

const baseBtnStyles = css`
  height: 25px;
  border-radius: 6px;
`;

export const pageBtnStyles = css`
  ${baseBtnStyles}
  background: unset;
  box-shadow: unset;
  color: #070821;
  padding: 0 9px;

  &:hover,
  &:active,
  &:focus {
    background: #eef1f7;
    box-shadow: unset;
  }
`;

const selectedBtnBg = (theme: Theme) => css`
  background: ${theme.colors.blueLightDarker};
  background: linear-gradient(
    247.37deg,
    ${theme.colors.blueLightDarker},
    ${theme.colors.blueDark}
  );
`;

export const selectedPageBtnStyles = (theme: Theme) => css`
  ${baseBtnStyles}

  ${selectedBtnBg(theme)}

  color: white;

  margin: 0 3px;
  padding: 0 10px;

  &:hover {
    box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.3);
    cursor: default;
  }

  &:hover,
  &:active,
  &:focus {
    ${selectedBtnBg(theme)}
  }
`;

export const arrowBtnStyles = css`
  ${baseBtnStyles}

  padding: 0 8px;
  background: #eef1f7;

  &:disabled {
    cursor: default;
    background: unset;
  }

  &:not(:disabled):hover {
    box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

/*
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
 */
