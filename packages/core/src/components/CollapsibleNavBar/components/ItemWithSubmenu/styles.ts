import { Theme, css } from '@emotion/react';
import { CollapsibleNavBarExtendedProps } from '@components/CollapsibleNavBar/types';

export const AccordionTitleWrapper =
  (navBarTheme: CollapsibleNavBarExtendedProps['theme']) =>
  (theme: Theme) => css`
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
      stroke: ${navBarTheme === 'default' ? '#fff' : theme.colors.greyDarker80};
      fill: none;
    }

    & .trigger-icon {
      height: 22px;
    }

    &:has(+ div > a.active) {
      & div:nth-of-type(2) button {
        font-weight: 900;
      }
    }
  `;

export const AccordionTitle =
  (navBarTheme: CollapsibleNavBarExtendedProps['theme']) =>
  (theme: Theme) => css`
    padding: 0 14px 0 20px;
    color: ${navBarTheme === 'default'
      ? theme.colors.white
      : theme.colors.greyDarker};
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
