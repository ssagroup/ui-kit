import { Theme, css } from '@emotion/react';

export const AccordionTitleWrapper = (theme: Theme) => css`
  cursor: pointer;
  align-items: flex-start;
  ${theme.mediaQueries.md} {
    justify-content: center;
  }
`;

export const AccordionTitle = (theme: Theme) => css`
  padding: 0 14px 0 22px;
  & svg {
    & path {
      fill: none;
    }
  }
  ${theme.mediaQueries.md} {
    display: none;
  }
`;

export const AccordionContent = (theme: Theme) => css`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-left: 44px;
  overflow: hidden;
  & a {
    width: 100%;
    padding: 4.8px 0;
    &:first-of-type {
      padding-top: 15px;
    },
  },
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

export const ContentToggle = (theme: Theme) => css`
  display: none;
  position: absolute;
  cursor: pointer;
  right: -17px;
  width: 34px;
  height: 34px;
  background: ${theme.colors.greyLighter};
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
