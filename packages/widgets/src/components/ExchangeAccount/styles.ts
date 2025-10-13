import { css, Theme } from '@emotion/react';

export const CardBase =
  ({ disabled }: { disabled: boolean }) =>
  (theme: Theme) => css`
    padding: 0;
    border-radius: 20px;
    box-shadow: 0px 10px 40px 0px ${theme.colors.greyShadow};
    transition: 0.3s;

    &:hover {
      ${!disabled &&
      `box-shadow: 0px 10px 40px 0px ${theme.colors.greyShadowHover};`}
    }
  `;

export const CardHeader = (theme: Theme) => css`
  display: flex;
  justify-content: start;
  width: 100%;
  padding: 10px;
  border-radius: 20px 20px 0 0;
  background: ${theme.colors.greyLighter};
  margin-bottom: 0;

  ${theme.mediaQueries.md} {
    h6 {
      font-size: 16px;
      line-height: 24px;
    }
  }

  ${theme.mediaQueries.xs} {
    padding: 6px 10px;
  }
`;

export const RemoveButton = (theme: Theme) => css`
  height: auto;
  padding: 0;
  background: none;
  box-shadow: none;
  margin-left: auto;

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
  }

  &:hover {
    svg path {
      fill: ${theme.colors.greyDarker};
    }
  }
`;

export const Platform = css`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-right: 13px;
`;

export const Status = (theme: Theme) => css`
  width: 100%;
  text-align: center;
  padding: 4px;

  &.active {
    color: ${theme.colors.greenDark};
    background: ${theme.colors.greenMint};
  }

  &.not-available {
    color: ${theme.colors.red};
    background: ${theme.colors.redLighter40};
  }

  ${theme.mediaQueries.md} {
    font-size: 14px;
    line-height: 17px;
  }
`;

export const CardContent = (theme: Theme) => css`
  width: 100%;
  padding: 10px 20px;
  & > div {
    flex-direction: row;
  }

  ul:last-child {
    li {
      justify-content: flex-end;
      text-align: right;
    }
  }

  ${theme.mediaQueries.sm} {
    & > div {
      justify-content: space-around;
    }
  }

  ${theme.mediaQueries.md} {
    justify-content: space-around;
    & > div {
      flex-direction: column;
    }
  }

  ${theme.mediaQueries.lg} {
    & > div {
      flex-direction: row;
    }
  }
`;
