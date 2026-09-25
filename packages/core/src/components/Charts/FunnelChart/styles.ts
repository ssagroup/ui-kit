import { css, Theme } from '@emotion/react';

const label = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  pointer-events: none;
`;

// Fills the container. With no definite height, height: 100% resolves to
// auto and the inline aspect-ratio takes over.
export const root = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

// Absolutely positioned so the chart's own size never feeds back into the
// measured container size.
export const chart = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const content = css`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

export const svg = css`
  flex-shrink: 0;
  display: block;
`;

export const noPointerEvents = css`
  pointer-events: none;
`;

export const innerLabel = (theme: Theme) => css`
  ${label};
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${theme.colors.white};
`;

// Every row shares one grid cell and is pushed to its level by margins, so
// the column is as wide as its widest label. It overlaps the shape, so it
// must let hover through to the levels.
export const pointerLabels = css`
  pointer-events: none;
  display: grid;
  grid-template-areas: 'label';
  align-items: start;
`;

// Zero-height row centred on the leader line, so labels of any height stay
// aligned with their level.
export const pointerLabelRow = css`
  grid-area: label;
  display: flex;
  align-items: center;
  height: 0;
`;

export const pointerLabel = (theme: Theme) => css`
  ${label};
  color: ${theme.colors.greyDarker};
`;
