import { css } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';

export const AccountCard = css`
  width: 100%;
  border-radius: 20px;
  padding: 0;
  background: ${mainTheme.colors.greyLighter};
  border: 1px solid ${mainTheme.colors.white};
  box-shadow: 0px 10px 40px 0px ${mainTheme.colors.greyShadow};
  transition: 0.3s;
  cursor: pointer;

  a,
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 21px 0;
    color: ${mainTheme.colors.blueRoyal};
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0;
    text-decoration: none;
  }

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
`;
