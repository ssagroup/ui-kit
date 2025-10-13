import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import Input from '@components/Input';

const baseBtnStyles = (theme: Theme) => css`
  height: 30px;
  border-radius: 6px;

  ${theme.mediaQueries.md} {
    height: 25px;
  }

  &:disabled {
    cursor: default;
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

  &:disabled {
    background: unset;
    box-shadow: unset;
  }

  &:not(:disabled):hover,
  &:not(:disabled):active,
  &:not(:disabled):focus {
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

  &:disabled {
    background: ${theme.colors.blueLightDarker};
    background: linear-gradient(
      247.37deg,
      ${theme.colors.blueDark},
      ${theme.colors.blueLightDarker}
    );
  }
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

  &:hover,
  &:active,
  &:focus {
    ${selectedBtnBg(theme)}
  }

  &:not(:disabled):hover {
    box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.3);
    cursor: default;
  }
`;

export const arrowBtnStyles = (theme: Theme) => css`
  ${baseBtnStyles(theme)}

  padding: 0 8px;
  background: ${theme.colors.white};

  &:disabled {
    background: unset;
  }

  &:not(:disabled):hover {
    box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

export const PaginationNav = styled.nav`
  display: flex;
`;

export const PageNumberInput = styled(Input)`
  width: 65px;
  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus,
  &:hover {
    border-width: 1px !important;
  }
  & + div {
    right: 24px;
  }
`;
