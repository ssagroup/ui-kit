import { css, Theme } from '@emotion/react';

const baseBtnStyles = (theme: Theme) => css`
  height: 30px;
  border-radius: 6px;

  ${theme.mediaQueries.md} {
    height: 25px;
  }
`;

export const pageBtnStyles = (theme: Theme) => css`
  ${baseBtnStyles(theme)}

  background: unset;
  box-shadow: unset;
  color: #070821;
  padding: 0 11px;

  ${theme.mediaQueries.md} {
    padding: 0 9px;
  }

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
    ${theme.colors.blueDark},
    ${theme.colors.blueLightDarker}
  );
`;

export const selectedPageBtnStyles = (theme: Theme) => css`
  ${baseBtnStyles(theme)}

  ${selectedBtnBg(theme)}

  color: white;
  margin: 0 3px;
  padding: 0 13px;

  ${theme.mediaQueries.md} {
    padding: 0 10px;
  }

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

export const arrowBtnStyles = (theme: Theme) => css`
  ${baseBtnStyles(theme)}

  padding: 0 8px;
  background: #fff;

  &:disabled {
    cursor: default;
    background: unset;
  }

  &:not(:disabled):hover {
    box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
