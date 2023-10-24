import { Theme, css } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';

export const ResetBtnStyles = css`
  padding: 0;
  height: auto;
  background: none;

  &:focus,
  &:hover {
    border: none;
    background: none;
    box-shadow: none;

    &::before {
      border: none;
    }
  }
`;

export const PopoverWrapper = (theme: Theme) => css`
  align-items: flex-start;
  z-index: 1;
  width: 345px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px 0px ${theme.colors.black25};
  background: ${theme.colors.greyPopoverLight};

  ${theme.mediaQueries.md} {
    width: 470px;
  }

  ${theme.mediaQueries.xs} {
    width: 310px;
  }
`;

export const PopoverContentWrapper = (theme: Theme) => css`
  width: 100%;
  padding: 10px;

  ${theme.mediaQueries.md} {
    padding: 20px;
  }
`;

export const List = css`
  max-height: 460px;
  overflow: auto;
`;

export const ButtonsWrapper = (theme: Theme) => css`
  display: grid;
  grid-template-columns: auto;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-top: 0.4px solid ${theme.colors.greyGraphite70};

  ${theme.mediaQueries.md} {
    padding: 10px 20px 13px;
  }

  ${theme.mediaQueries.xs} {
    button {
      span {
        font-size: 12px;
      }
    }
  }
`;

export const Close = (theme: Theme) => css`
  position: absolute;
  right: 10px;
  top: 15px;
  ${ResetBtnStyles};

  ${theme.mediaQueries.md} {
    right: 26px;
    top: 26px;
  }
`;

export const Loading = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 460px;

  &:before {
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

export const ButtonGroupCustom = css`
  margin: 12px 0 11px;
  background: ${mainTheme.colors.white};
  &:hover {
    background: ${mainTheme.colors.greyLighter};
  }

  &[aria-disabled='true'] {
    background: none;
    box-shadow: none;
    &:hover {
      background: none;
    }
  }
`;
