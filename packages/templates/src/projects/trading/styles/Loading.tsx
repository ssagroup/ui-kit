import { Theme, css } from '@emotion/react';

export const Loading = (theme: Theme) => css`
  position: absolute;
  left: 0;
  bottom: 50%;
  width: 100%;
  height: 13px;
  font-size: 34px;
  letter-spacing: 0;

  &::after {
    position: absolute;
    left: 50%;
    top: 50%;
    color: transparent;
    transform: translate(-50%, -50%);
    content: '';
    animation: loading-dots 800ms linear infinite;
  }

  @keyframes loading-dots {
    33% {
      content: '•';
      color: ${theme.colors.white};
      transition: 0.3s;
    }
    66% {
      content: '••';
      color: ${theme.colors.white};
    }
    100% {
      content: '•••';
      color: ${theme.colors.white};
    }
  }
`;

export const ConfirmEmailLoading = (theme: Theme) => css`
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
