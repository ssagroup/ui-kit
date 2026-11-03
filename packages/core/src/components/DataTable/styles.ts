import { css, Theme } from '@emotion/react';

export const root = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
`;

/** A header button that looks like the header text it wraps. */
export const sortButton = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${theme.colors.blueRoyal};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const headerLabel = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** Rows stay readable but plainly stale while a re-fetch is in flight. */
export const busyBody = css`
  opacity: 0.5;
  transition: opacity 150ms;
`;

export const clickableRow = (theme: Theme) => css`
  cursor: pointer;

  &:hover > td,
  &:focus-visible > td {
    background: ${theme.colors.greyLighter};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blueRoyal};
    outline-offset: -2px;
  }
`;

export const stateCell = (theme: Theme) => css`
  height: 88px;
  text-align: center;
  color: ${theme.colors.greyDarker60};
`;
