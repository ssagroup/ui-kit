import { Theme, css } from '@emotion/react';

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

export const AccountCard = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  color: ${theme.colors.blueRoyal};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0;
  text-decoration: none;
  border-radius: 20px;
  padding: 21px 0;
  background: ${theme.colors.greyLighter};
  border: 1px solid ${theme.colors.white};
  box-shadow: 0px 10px 40px 0px ${theme.colors.greyShadow};
  transition: 0.3s;

  &:focus {
    background: ${theme.colors.greyLighter};
    border: 1px solid ${theme.colors.white};
    box-shadow: 0px 10px 40px 0px ${theme.colors.greyShadow};
  }

  &:hover {
    border: 1px solid ${theme.colors.white};
    background: ${theme.colors.greyLighter};
    box-shadow: 5px 5px 20px 0px ${theme.colors.black25};
  }

  ${theme.mediaQueries.md} {
    padding: 91px 0 101px;
  }
`;
