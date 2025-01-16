import { css, Theme } from '@emotion/react';

export const infoCardWrapper = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
  min-width: 100%;
  background: ${theme.colors.greyLighter};
  padding: 4px 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: none;
  user-select: none;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
    content: '';
  }

  &:active {
    background: ${theme.colors.white};

    &::before {
      border-radius: 6px;
      box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow24};
    }
  }
`;
