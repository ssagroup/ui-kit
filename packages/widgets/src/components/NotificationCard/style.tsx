import { Theme, css } from '@emotion/react';

export const notifyCard = (theme: Theme) => css`
  display: grid;
  column-gap: 9px;
  grid-template-columns: auto 1fr auto;
  padding: 14px 12px;
  align-items: flex-start;

  ${theme.mediaQueries.md} {
    column-gap: 12px;
    padding: 14px 18px 14px 12px;
  }

  ${theme.mediaQueries.xs} {
    padding: 10px 8px;
  }
`;

export const notifyBadge = (theme: Theme) => css`
  display: grid;
  grid-row: 1 / span 2;
  height: auto;
  width: fit-content;
  padding: 8px;
  border-radius: 6px;
  box-shadow: -4px 12px 14px 0 #dae1e1;

  ${theme.mediaQueries.md} {
    padding: 11px;
    border-radius: 12px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const notifyTitle = (theme: Theme) => css`
  grid-row: 1;
  grid-column: 2;
  margin-bottom: 2px;

  ${theme.mediaQueries.md} {
    margin-top: -3px;
    font-size: 16px;
    line-height: 20px;
  }

  ${theme.mediaQueries.xs} {
    grid-row: 2;
  }
`;

export const notifyText = (theme: Theme) => css`
  grid-row: 2;
  grid-column: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    overflow: visible;
    text-overflow: inherit;
    white-space: normal;
  }

  ${theme.mediaQueries.md} {
    font-size: 13.3px;
    line-height: 20px;
    overflow: visible;
    text-overflow: inherit;
    white-space: normal;
  }

  ${theme.mediaQueries.xs} {
    grid-row: 3;
  }
`;

export const childrenWrapper = (theme: Theme) => css`
  grid-column: 2 / span 2;
  margin-top: 10px;

  button {
    height: 31px;
    border-radius: 6px;
    font-weight: 700;

    &:focus::before {
      content: none;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  ${theme.mediaQueries.md} {
    margin-top: 13px;
  }

  ${theme.mediaQueries.xs} {
    button {
      height: 28px;
      padding: 10px;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;

export const notifyTime = (theme: Theme) => css`
  grid-row: 1;
  grid-column: 3;
  text-align: right;

  ${theme.mediaQueries.xs} {
    grid-column: 2;
    text-align: left;
  }
`;
