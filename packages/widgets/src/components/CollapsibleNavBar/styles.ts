import { Theme, css } from '@emotion/react';

export const SVGHoverShadow = (theme: Theme) => css`
  filter: drop-shadow(-4px 4px 14px ${theme.colors.white});
  & path {
    fill: ${theme.colors.white};
  }
  & circle {
    stroke: ${theme.colors.white};
  }
`;

export const SVGMainStyle = (theme: Theme) => css`
  & svg {
    & path {
      fill: ${theme.colors.greyDisabledCheckbox};
    }
    & circle {
      stroke: ${theme.colors.greyDisabledCheckbox};
    }
  }
`;

export const AccordionTitleWrapper = (theme: Theme) => css`
  cursor: pointer;
  align-items: flex-start;
  ${SVGMainStyle(theme)}
  ${theme.mediaQueries.sm} {
    justify-content: center;
  }
  &:hover {
    & > div:nth-of-type(2) > svg {
      ${SVGHoverShadow(theme)}
    }
  }
`;

export const AccordionTitle = (theme: Theme) => css`
  padding: 0 14px 0 22px;
  & svg {
    & path {
      fill: none;
    }
  }
  ${theme.mediaQueries.sm} {
    display: none;
  }
`;

export const AccordionContent = (theme: Theme) => css`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-left: 44px;
  & a {
    width: 100%;
    padding: 4.8px 0;
    &:first-of-type {
      padding-top: 15px;
    },
  },
  ${theme.mediaQueries.xs} {
    display: none;
  }
  ${theme.mediaQueries.sm} {
    display: none;
  }
`;

export const AccordionContentPopover = (theme: Theme) => css`
  display: flex;
  ${theme.mediaQueries.xs} {
    display: flex;
  }
  ${theme.mediaQueries.sm} {
    display: flex;
  }
`;

export const IconWrapper = (theme: Theme) => css`
  width: 24px;
  height: 24px;
  ${SVGMainStyle(theme)}
  &:hover svg {
    ${SVGHoverShadow(theme)}
  }
`;

export const ResponsiveLogo = (theme: Theme) => css`
  width: 48px;
  height: 42px;
  &:hover: {
    filter: drop-shadow(0px 5px 5px ${theme.colors.grey});
  }
  display: none;
  ${theme.mediaQueries.sm} {
    display: block;
  }
  ${theme.mediaQueries.md} {
    width: 55px;
    height: 48px;
    margin-left: 7px;
    &:has(~ div > input[type='checkbox']:checked) {
      margin-left: 34px;
    }
  }
`;

export const LogoWrapper = (theme: Theme) => css`
  position: relative;
  ${theme.mediaQueries.sm} {
    justify-content: center;
  }
  ${theme.mediaQueries.md} {
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
  ${theme.mediaQueries.md} {
    display: flex;
  }
`;
