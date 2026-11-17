import { css, Theme } from '@emotion/react';
import {
  FIELD_CONTROL_BORDER_WIDTH,
  FIELD_CONTROL_HEIGHT,
  FIELD_CONTROL_RADIUS,
  fieldGeometryBoxSizing,
} from '@styles/fieldControl';

export const wrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const hiddenInput = css`
  display: none;
`;

// ─── Input row (button + filename) ───────────────────────────────────────────

/*
 * Under fieldGeometryV2 there is no vertical padding: the 36px button is
 * centred by align-items, and padding would push the border-box row past 44px.
 * Without the flag the row keeps its pre-3.27.2 46px.
 */
export const inputRow = (theme: Theme, fieldGeometryV2: boolean) => css`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  ${fieldGeometryBoxSizing({ fieldGeometryV2 })}
  min-height: ${FIELD_CONTROL_HEIGHT}px;
  padding: ${fieldGeometryV2 ? '0 14px 0 3px' : '4px 14px 4px 4px'};

  background: ${theme.colors.white};
  border: ${FIELD_CONTROL_BORDER_WIDTH}px solid ${theme.colors.grey};
  border-radius: ${FIELD_CONTROL_RADIUS}px;

  cursor: default;

  &:hover {
    border-color: ${theme.colors.greyDarker80};
  }
`;

export const inputRowError = (theme: Theme) => css`
  border-color: ${theme.palette.error.light};

  &:hover {
    border-color: ${theme.palette.error.main};
  }
`;

export const inputRowDisabled = (theme: Theme) => css`
  background: ${theme.colors.greyLighter};
  border-color: ${theme.colors.grey};
  pointer-events: none;

  &:hover {
    border-color: ${theme.colors.grey};
  }
`;

export const fileNameText = (theme: Theme) => css`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${theme.colors.greyDarker};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const placeholderText = (theme: Theme) => css`
  color: ${theme.colors.greyDarker60};
`;

// ─── Drop area ────────────────────────────────────────────────────────────────

export const dropArea = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 160px;
  padding: 32px 24px;

  background: ${theme.palette.secondary.light};
  border: 2px solid ${theme.colors.grey};
  border-radius: 16px;

  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border: 2px dashed ${theme.palette.primary.main};
    background: ${theme.colors.blueRoyal6};
  }

  &:focus {
    outline: none;
    border: 2px dashed ${theme.palette.primary.main};
    background: ${theme.colors.blueRoyal6};
  }
`;

export const dropAreaActive = (theme: Theme) => css`
  border: 2px dashed ${theme.palette.primary.main};
  background: ${theme.colors.blueRoyal6};
`;

export const dropAreaError = (theme: Theme) => css`
  border-color: ${theme.palette.error.light};
  background: ${theme.colors.redLighter6};

  &:hover {
    border-color: ${theme.palette.error.main};
    background: ${theme.colors.redLighter6};
  }
`;

export const dropAreaDisabled = (theme: Theme) => css`
  background: ${theme.colors.greyLighter};
  border-color: ${theme.colors.grey};
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.6;
`;

export const dropAreaTitle = (theme: Theme) => css`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${theme.colors.greyDarker};
  text-align: center;
  margin-top: 4px;
`;

export const dropAreaHint = (theme: Theme) => css`
  font-size: 0.8125rem;
  font-weight: 400;
  color: ${theme.colors.greyDarker60};
  text-align: center;
`;

export const dropAreaAction = (theme: Theme) => css`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${theme.colors.greyDarker};
  text-align: center;
  margin-top: 4px;
`;

export const dropAreaClearButton = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  margin-top: 8px;
  padding: 4px 10px;

  font-size: 0.8125rem;
  font-weight: 400;
  color: ${theme.colors.greyDarker60};

  background: transparent;
  border: 1px solid ${theme.colors.grey};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: ${theme.palette.error.main};
    border-color: ${theme.palette.error.light};
    & svg {
      stroke: ${theme.palette.error.main};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ─── Uploaded files list ──────────────────────────────────────────────────────

export const filesList = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const filesListTitle = (theme: Theme) => css`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.greyDarker};
  margin-bottom: 4px;
`;
