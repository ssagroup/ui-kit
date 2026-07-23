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
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 140px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey20};
  border-radius: 8px;
  box-shadow: 0 8px 24px ${theme.colors.greyDarker14};
`;

export const menuItem = css`
  ${fontBase};
  font-weight: 500;
  display: block;
  padding: 6px 10px;
  border-radius: 6px;
  color: ${theme.colors.greyDarker80};
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover,
  &:focus-visible {
    color: ${theme.colors.greyDarker};
    background-color: ${theme.colors.blue6};
  }
`;
