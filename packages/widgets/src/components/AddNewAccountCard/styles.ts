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

export const AccountCard = css`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 6px;
  width: 100%;
  color: ${mainTheme.colors.blueRoyal};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0;
  text-decoration: none;
  border-radius: 20px;
  padding: 21px 0;
  background: ${mainTheme.colors.greyLighter};
  border: 1px solid ${mainTheme.colors.white};
  box-shadow: 0px 10px 40px 0px ${mainTheme.colors.greyShadow};
  transition: 0.3s;
  cursor: pointer;

  &:focus {
    background: ${mainTheme.colors.greyLighter};
    border: 1px solid ${mainTheme.colors.white};
    box-shadow: 0px 10px 40px 0px ${mainTheme.colors.greyShadow};
  }

  &:hover {
    border: 1px solid ${mainTheme.colors.white};
    background: ${mainTheme.colors.greyLighter};
    box-shadow: 5px 5px 20px 0px ${mainTheme.colors.black25};
  }

  ${mainTheme.mediaQueries.md} {
    padding: 91px 0 101px;
  }
`;
