import { css, Theme } from '@emotion/react';

export const ProgressPointWrapper = (theme: Theme) => css`
  margin-top: 9px;

  ${theme.mediaQueries.md} {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 5px;
    margin-top: 27px;

    &::before {
      position: absolute;
      left: 0;
      top: 24px;
      display: block;
      width: 100%;
      height: 1px;
      background: repeating-linear-gradient(
        to right,
        ${theme.colors.white},
        ${theme.colors.white} 3px,
        ${theme.colors.grey} 0,
        ${theme.colors.grey} 8px
      );
      content: '';
    }
  }
`;

export const ProgressPointItem = (theme: Theme) => css`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin-bottom: 9px;

  ${theme.mediaQueries.md} {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

export const ProgressPointCircle = (theme: Theme) => css`
  position: relative;
  z-index: 1;
  align-self: center;
  flex-shrink: 0;
  order: -1;
  width: 7px;
  height: 7px;
  border-radius: 50%;

  ${theme.mediaQueries.md} {
    align-self: auto;
    order: 0;
    width: 10px;
    height: 10px;
  }
`;

export const ProgressPointTitle = (theme: Theme) => css`
  align-self: center;
  min-width: 20px;
  text-align: left;
  font-size: 10px;

  ${theme.mediaQueries.md} {
    align-self: auto;
    font-size: inherit;
  }
`;

export const ProgressPointValues = (theme: Theme) => css`
  font-size: 12px;
  line-height: 16px;
  overflow-wrap: anywhere;
  text-align: left;

  span {
    font-size: 10px;
    font-weight: 500;
  }

  ${theme.mediaQueries.md} {
    font-size: inherit;
    text-align: inherit;
    min-height: 16px;

    span {
      font-size: 12px;
    }
  }
`;
