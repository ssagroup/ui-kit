import { css } from '@emotion/react';

import theme from '@themes/main';

const fontBase = css`
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0;
`;

export const nav = css`
  display: block;
`;

export const list = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const item = css`
  display: inline-flex;
  align-items: center;
`;

export const separator = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.greyDarker80};
  pointer-events: none;
  user-select: none;
`;

export const crumbLink = css`
  ${fontBase};
  font-weight: 500;
  color: ${theme.colors.greyDarker80};
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover,
  &:focus-visible {
    color: ${theme.colors.greyDarker};
  }
`;

export const crumbText = css`
  ${fontBase};
  font-weight: 500;
  color: ${theme.colors.greyDarker80};
`;

export const crumbCurrent = css`
  ${fontBase};
  font-weight: 600;
  color: ${theme.palette.primary.dark};
`;

export const menu = css`
  min-width: 140px;
`;

/* Fills the whole row (cancelling its padding), so a click anywhere on the
   row lands on the link. */
export const menuLink = css`
  flex: 1;
  display: block;
  min-width: 0;
  margin: -8px -12px;
  padding: 8px 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: inherit;
  text-decoration: none;
`;
