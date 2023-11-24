import { Theme, css } from '@emotion/react';

export const CardBase = (theme: Theme) => css`
  padding: 0;
  border-radius: 20px;
  box-shadow: 0px 10px 40px 0px ${theme.colors.greyShadow};
  transition: 0.3s;

  &:hover {
    box-shadow: 5px 5px 20px 0px ${theme.colors.black25};
  }
`;

export const CardHeader = (theme: Theme) => css`
  display: grid;
  grid-template-columns: auto 1fr 20px;
  align-items: center;
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

  ul:last-child {
    li {
      justify-content: flex-end;
      text-align: right;
    }
  }

  ${theme.mediaQueries.md} {
    > div {
      display: block;
      text-align: center;

      .pie-chart-wrapper {
        margin: 0 auto 6px;
      }
    }

    ul {
      display: inline-flex;
      height: auto;
    }

    ul:last-child {
      margin-left: 30px;
    }
  }

  ${theme.mediaQueries.lg} {
    > div {
      display: flex;
      justify-content: space-around;

      .pie-chart-wrapper {
        margin: 0 10px 0 0;
      }
    }

    ul {
      display: flex;
      margin-left: 0;
    }

    ul:last-child {
      margin-left: 10px;
    }
  }
`;
