import { css, Theme } from '@emotion/react';

/** Row height for options and group titles (Figma draws 32 and 34; 34 wins). */
export const ROW_HEIGHT = 34;

export const menu = (theme: Theme) => css`
  box-sizing: border-box;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  overflow: hidden auto;

  background: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: -4px 4px 14px 0 ${theme.colors.greyDarker14};
  outline: none;

  /* A 4px rounded thumb on no track, as drawn in the design. */
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.grey} transparent;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.grey};
    border-radius: 2px;
  }

  &:focus-visible {
    box-shadow:
      -4px 4px 14px 0 ${theme.colors.greyDarker14},
      0 0 0 2px ${theme.colors.blue20};
  }
`;

export const group = (theme: Theme) => css`
  & + & {
    border-top: 1px solid ${theme.colors.greyFocused};
  }
`;

export const groupList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const rowBase = (theme: Theme) => css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  height: ${ROW_HEIGHT}px;
  padding: 8px 12px;

  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: ${theme.colors.greyDarker};
`;

export const groupLabel = (theme: Theme) => css`
  ${rowBase(theme)};
  font-weight: 600;
`;

/*
 * State lives in data attributes so the rule set is the same for every row:
 * the highlight moves on every pointer move and arrow press, and a per-state
 * emotion class would be regenerated each time.
 */
export const option = (theme: Theme) => css`
  ${rowBase(theme)};
  cursor: pointer;
  user-select: none;

  &[data-active] {
    background: ${theme.colors.blue6};
  }
  &[data-selected] {
    background: ${theme.colors.blue12};
  }
  &[aria-disabled='true'] {
    cursor: default;
    color: ${theme.colors.greyDarker40};
  }
`;

export const empty = (theme: Theme) => css`
  ${rowBase(theme)};
  color: ${theme.colors.greyDarker80};
`;

export const label = css`
  /* Explicit: the global colour reset would otherwise beat inheritance. */
  color: inherit;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const description = (theme: Theme) => css`
  flex: 0 0 auto;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.colors.greyDarker80};
  white-space: nowrap;

  [aria-disabled='true'] & {
    color: inherit;
  }
`;

export const status = css`
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

export const slot = css`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
`;

/* The checkbox is a picture of the state: the row is the control. */
export const checkbox = css`
  display: inline-flex;
  flex: 0 0 auto;
  pointer-events: none;

  & label {
    margin: 0;
  }
`;

export const includeExcludeControls = css`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
`;

export const includeExcludeControl = css`
  display: inline-flex;
  cursor: pointer;

  &[aria-disabled='true'] {
    cursor: default;
  }
`;

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;
