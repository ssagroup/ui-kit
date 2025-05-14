import { Theme, css } from '@emotion/react';

export const ButtonItem = (theme: Theme) => css`
  justify-content: center;
  min-width: 40px;
  height: auto;
  padding: 8px;
  text-align: center;
  letter-spacing: 0em;
  border-radius: 0;
  box-shadow: none;
  user-select: none;

  &:hover,
  &:focus,
  &:active {
    box-shadow: none;
  }

  &:first-of-type {
    border-radius: 6px 0 0 6px;
  }

  &:last-child {
    border-radius: 0 6px 6px 0;
  }

  &:not(:last-child) {
    margin-right: 1px;
  }

  &.active {
    background: ${theme.colors.greyFocused};
  }

  &:disabled {
    background: ${theme.colors.grey};

    p {
      color: ${theme.colors.grey40};
    }
  }

  ${theme.mediaQueries.md} {
    min-width: 65px;
    padding: 12px;

    p {
      font-size: 13.3px;
      line-height: 15px;
    }
  }
`;
