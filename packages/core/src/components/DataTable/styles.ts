import { css, Theme } from '@emotion/react';
import { EXPANDER_COLUMN_WIDTH, SELECTION_COLUMN_WIDTH } from './utils';

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

/**
 * Every header cell. Relative so the grip, the menu and the drop line have
 * something to sit against; a frozen header keeps its sticky position, whose
 * rule in TableBase is the more specific one.
 */
export const header = (theme: Theme) => css`
  position: relative;

  &[data-dragging='true'] {
    background: ${theme.colors.greyLighter};
  }

  &[data-drop]::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.colors.blueRoyal};
    pointer-events: none;
  }

  &[data-drop='before']::after {
    left: 0;
  }

  &[data-drop='after']::after {
    right: 0;
  }
`;

/** Room on the right for the menu, so long header text never runs under it. */
export const headerWithMenu = css`
  padding-right: 36px;
`;

/**
 * Pinned to the right edge of the header, clear of the resize handle, so it
 * lines up from column to column whatever the header text.
 */
export const headerMenu = css`
  position: absolute;
  top: 50%;
  right: 10px;
  margin-left: 0;
  transform: translateY(-50%);
`;

/**
 * Sits in the cell's left padding, so showing it never moves the header
 * text. Hidden until the header is hovered, like the column menu.
 */
export const grip = css`
  position: absolute;
  top: 50%;
  left: 2px;
  display: flex;
  transform: translateY(-50%);
  cursor: grab;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  touch-action: none;

  th:hover &,
  th[data-dragging='true'] & {
    opacity: 1;
  }

  @media (hover: none) {
    opacity: 1;
  }

  /* Shown, but faded and inert, when the column has nowhere to go. */
  &[data-disabled='true'] {
    cursor: not-allowed;
  }

  th:hover &[data-disabled='true'] {
    opacity: 0.35;
  }
`;

/** The checkbox or radio column: narrow, its control centred. */
export const selectionCell = css`
  width: ${SELECTION_COLUMN_WIDTH}px;
  padding: 0 14px;
  text-align: center;

  /* No text here, but the control's hidden label sits past the edge, which
     would otherwise draw an ellipsis in a resizable table. Doubled to beat
     TableBase's rule for resizable cells. */
  && {
    text-overflow: clip;
  }

  & > label {
    vertical-align: middle;
  }
`;

export const selectedRow = (theme: Theme) => css`
  /* Layered over white: frozen cells must stay opaque. */
  & > td {
    background:
      linear-gradient(${theme.colors.blue12}, ${theme.colors.blue12}), #fff;
  }
`;

export const visuallyHidden = css({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

/** The expand/collapse column. */
export const expanderCell = css`
  width: ${EXPANDER_COLUMN_WIDTH}px;
  padding: 0 0 0 12px;

  && {
    text-overflow: clip;
  }
`;

export const expanderButton = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 4px;
  background: none;
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.greyLighter};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blueRoyal};
    outline-offset: -2px;
  }
`;

/**
 * A row given a `background` by getRowProps. The colour arrives as a custom
 * property, so every tinted row shares this one class whatever its colour.
 * Layered over white: frozen cells must stay opaque. Hover and selection
 * rules come later or weigh more, so they paint over it.
 */
export const tintedRow = css`
  & > td {
    background:
      linear-gradient(var(--data-table-row-tint), var(--data-table-row-tint)),
      #fff;
  }
`;

/** A row with children, as NestedTable draws its group rows. */
export const parentRow = (theme: Theme) => css`
  /* Layered over white: frozen cells must stay opaque. */
  & > td {
    background:
      linear-gradient(
        ${theme.colors.greyLighter60},
        ${theme.colors.greyLighter60}
      ),
      #fff;
    font-weight: 700;
  }
`;

/** A tinted row with children: the row's tint over the parent grey. */
export const tintedParentRow = (theme: Theme) => css`
  & > td {
    background:
      linear-gradient(var(--data-table-row-tint), var(--data-table-row-tint)),
      linear-gradient(
        ${theme.colors.greyLighter60},
        ${theme.colors.greyLighter60}
      ),
      #fff;
  }
`;

/** A selected row with children: the selected tint over the parent grey. */
export const selectedParentRow = (theme: Theme) => css`
  & > td {
    background:
      linear-gradient(${theme.colors.blue12}, ${theme.colors.blue12}),
      linear-gradient(
        ${theme.colors.greyLighter60},
        ${theme.colors.greyLighter60}
      ),
      #fff;
  }
`;
