import { css, Theme } from '@emotion/react';

export const Loading = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &::before {
    width: 30px;
    height: 30px;
    border: 5px solid ${theme.colors.greyGraphite70};
    border-radius: 50%;
    border-top: 5px solid ${theme.colors.grey};
    animation: spin 2s linear infinite;
    content: '';
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonLoader = (theme: Theme) => css`
  height: 18px;
  width: 18px;

  &::before {
    height: 18px;
    width: 18px;
    border: 3px solid ${theme.colors.white};
    border-top: 3px solid transparent;
  }
`;
