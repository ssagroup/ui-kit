import { Theme, css } from '@emotion/react';
import { CollapsibleNavBarExtendedProps } from './types';

export const AccordionTitleWrapper =
  (navBarTheme: CollapsibleNavBarExtendedProps['theme']) => (theme: Theme) =>
    css`
      cursor: pointer;
      align-items: center;

      ${theme.mediaQueries.md} {
        display: flex;
        justify-content: center;
      }

      & div.icon-wrapper {
        width: 100%;
        gap: 0;
      }

      & div.icon-wrapper:not(.active):hover > button svg path,
      & div.icon-wrapper.active > button svg path {
        stroke: ${navBarTheme === 'default'
          ? '#fff'
          : theme.colors.greyDarker80};
        fill: none;
      }

      & .trigger-icon {
        height: 22px;
      }
    `;

export const AccordionTitle =
  (navBarTheme: CollapsibleNavBarExtendedProps['theme']) => (theme: Theme) =>
    css`
      padding: 0 14px 0 20px;
      color: ${navBarTheme === 'default'
        ? theme.colors.white80
        : theme.colors.greyDarker80};
      svg path {
        stroke: ${navBarTheme === 'light' && theme.colors.greyDropdownFocused};
      }
      ${theme.mediaQueries.md} {
        display: none;
      }
    `;

export const AccordionContent = (theme: Theme) => css`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-left: 45px;
  overflow: hidden;
  perspective: 1px;

  ${theme.mediaQueries.md} {
    display: none;
  }
  ${theme.mediaQueries.lg} {
    display: none;
  }
`;

export const AccordionContentPopover = (theme: Theme) => css`
  display: flex;
  ${theme.mediaQueries.md} {
    display: flex;
  }
  ${theme.mediaQueries.lg} {
    display: flex;
  }
`;

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
  (theme: Theme) =>
    css`
      display: none;
      position: absolute;
      cursor: pointer;
      right: ${isChecked ? '-32px' : '-17px'};
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
    `;
