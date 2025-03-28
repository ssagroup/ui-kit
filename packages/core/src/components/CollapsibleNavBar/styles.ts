import { Theme, css } from '@emotion/react';
import { CollapsibleNavBarExtendedProps } from './types';

export const LogoWrapper = (theme: Theme) => css`
  position: relative;
  ${theme.mediaQueries.md} {
    justify-content: center;
  }
  ${theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`;

export const ContentToggle =
  (navBarTheme: CollapsibleNavBarExtendedProps['theme'], isChecked: boolean) =>
  (theme: Theme) => css`
    display: none;
    position: absolute;
    cursor: pointer;
    right: -17px;
    width: 34px;
    height: 34px;
    background: ${navBarTheme === 'default'
      ? theme.colors.greyLighter
      : theme.colors.greyFocused};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    & input {
      display: none;
    }
    & svg {
      cursor: pointer;
    }
    ${theme.mediaQueries.lg} {
      display: flex;
    }
    ${theme.mediaQueries.xlg} {
      display: flex;
      right: ${isChecked ? '-32px' : '-17px'};
    }
  `;
