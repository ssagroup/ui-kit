import { Theme, css } from '@emotion/react';

export const AccordionTitleWrapper = (theme: Theme) => css`
  cursor: pointer;
  align-items: flex-start;
  ${theme.mediaQueries.sm} {
    justify-content: center;
  }
`;

export const AccordionTitle = (theme: Theme) => css`
  padding: 0 14px 0 20px;
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
    padding: 5px 0 5px 0;
    &:first-of-type {
      padding-top: 15px;
    },
    &:last-child {
      padding-bottom: 10px;
    },
  },
  ${theme.mediaQueries.xs} {
    display: none;
  }
  ${theme.mediaQueries.sm} {
    display: none;
    justify-content: center;
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
  & svg {
    & path {
      fill: #a4a7ab;
    }
    & circle {
      stroke: #a4a7ab;
    }
  }
  &:hover svg {
    filter: drop-shadow(-4px 4px 14px ${theme.colors.white});
    & path {
      fill: ${theme.colors.white};
    }
    & circle {
      stroke: ${theme.colors.white};
    }
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
`;
