import { css, Theme } from '@emotion/react';

const paddingBySize = { large: 16, small: 12 };
export const iconSizeBySize = { large: 40, small: 24 };
/** Placeholder glyph is inset ~20% on each side of its box in the design (40px box -> 24px glyph). */
export const placeholderIconSizeBySize = { large: 24, small: 14 };

export const container = (theme: Theme, size: 'large' | 'small') => css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  padding: ${paddingBySize[size]}px;

  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  border-radius: 12px;
`;

export const disabledContainer = (theme: Theme) => css`
  background: ${theme.colors.greyLighter};
`;

export const iconWrapper = (size: 'large' | 'small') => css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${iconSizeBySize[size]}px;
  height: ${iconSizeBySize[size]}px;
`;

export const placeholderWrapper = (theme: Theme) => css`
  background: ${theme.palette.secondary.dark};
  border-radius: 4px;
`;

export const previewImage = css`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
  display: block;
`;

export const textColumn = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const title = (theme: Theme) => css`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.greyDarker};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const description = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.greyDarker60};
  white-space: nowrap;
`;

export const dot = (theme: Theme) => css`
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${theme.colors.greyDarker60};
`;

export const progressTrack = (theme: Theme) => css`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  width: 60px;
  height: 4px;
  border-radius: 4px;
  background: ${theme.palette.secondary.light};
`;

export const progressFill = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  border-radius: 4px;
  background: ${theme.palette.primary.main};
`;

export const deleteButton = (theme: Theme) => css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  padding: 0;

  background: transparent;
  border: none;
  cursor: pointer;

  color: ${theme.colors.greyDarker60};
  transition: color 0.15s ease;

  &:hover {
    color: ${theme.palette.error.main};
  }

  &:disabled {
    cursor: default;
    color: ${theme.colors.grey};
  }
`;
