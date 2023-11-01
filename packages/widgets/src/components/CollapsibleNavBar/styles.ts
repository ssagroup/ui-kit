import { Theme, css } from '@emotion/react';

export const AccordionContent = () => css`
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
      padding-bottom: 10,
    },
  },
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
