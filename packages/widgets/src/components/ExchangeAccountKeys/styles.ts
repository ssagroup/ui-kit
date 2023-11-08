import { Theme, css } from '@emotion/react';

export const Card = (theme: Theme) => css`
  box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
  padding: 0;
  border-radius: 20px;

  &.disabled {
    pointer-events: none;
  }
`;

export const CardHeader = (theme: Theme) => css`
  align-items: center;
  background: ${theme.colors.greyLighter};
  padding: 10px;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0;

  ${theme.mediaQueries.md} {
    padding: 15px 10px 15px 30px;
  }
`;

export const DeleteButton = (theme: Theme) => css`
  height: auto;
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

  ${theme.mediaQueries.md} {
    padding: 12px;
  }
`;

export const CardContent = (theme: Theme) => css`
  width: 100%;
  padding: 10px;

  ${theme.mediaQueries.md} {
    padding: 13px 30px 20px;
  }
`;

export const KeyItem = css`
  display: flex;
  flex-direction: column;
  gap: 5px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const VisibleButton = css`
  height: auto;
  padding: 0;
  background: none;
  box-shadow: none;

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
  }
`;

export const SecretKey = css`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 24px;

  span {
    padding: 4px 0 0;
  }
`;

export const NoWrapText = (theme: Theme) => css`
  white-space: nowrap;
  overflow-x: auto;

  ${theme.mediaQueries.md} {
    overflow-x: visible;
  }
`;
