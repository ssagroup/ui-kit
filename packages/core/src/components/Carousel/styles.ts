import { css, Theme } from '@emotion/react';

import { CarouselFit, CarouselThumbnailsPosition } from './types';

export const THUMB_SIZE = 52;
const GAP = 16;

const DIRECTION = {
  left: 'row-reverse',
  right: 'row',
  bottom: 'column',
} as const;

export const root = (thumbnails: CarouselThumbnailsPosition) => css`
  display: flex;
  flex-direction: ${thumbnails ? DIRECTION[thumbnails] : 'row'};
  gap: ${GAP}px;
  width: 100%;
`;

export const viewport = (theme: Theme) => css`
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: 12px;
  background: ${theme.colors.white};

  &:has(:focus-visible) {
    border-color: ${theme.colors.blue};
  }

  &:hover .carousel-open-full,
  &:focus-within .carousel-open-full {
    opacity: 1;
  }
`;

export const track = css`
  display: flex;
  height: 100%;
  transition-property: transform;
  transition-timing-function: ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`;

export const slide = css`
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 0;
`;

export const image = (fit: CarouselFit) => css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: ${fit};
  user-select: none;
`;

export const placeholder = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${theme.colors.greyFocused};
`;

// Insets are measured inside the 1px border, so 11px lands 12px from the edge.
export const controls = css`
  position: absolute;
  right: 11px;
  bottom: 11px;
  left: 11px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

export const dots = css`
  position: absolute;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
`;

export const dot = (theme: Theme, active: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &::before {
    content: '';
    width: 9px;
    height: 9px;
    box-sizing: border-box;
    border: 1px solid ${active ? theme.colors.blue : theme.colors.grey};
    border-radius: 50%;
    background: ${theme.colors.white};
  }

  &:focus-visible {
    outline: 1px solid ${theme.colors.blue};
    border-radius: 50%;
  }
`;

export const arrows = css`
  display: flex;
  gap: 20px;
`;

export const squareButton = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: ${theme.palette.secondary.light};
  cursor: pointer;

  &:hover {
    background: ${theme.palette.secondary.main};
  }

  &:focus-visible {
    outline: 1px solid ${theme.colors.blue};
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: ${theme.palette.secondary.light};
  }
`;

export const openFull = css`
  position: absolute;
  top: 11px;
  right: 11px;
  opacity: 0;
  transition: opacity 150ms ease;

  @media (hover: none) {
    opacity: 1;
  }
`;

/**
 * The vertical strip is taken out of flow so that it never stretches the
 * row: its height comes from the slide next to it, and the rest scrolls.
 */
export const thumbStripWrapper = (vertical: boolean) => css`
  position: relative;
  flex: 0 0 auto;
  ${vertical ? `width: ${THUMB_SIZE}px;` : 'width: 100%;'}
`;

export const thumbStrip = (vertical: boolean) => css`
  display: flex;
  flex-direction: ${vertical ? 'column' : 'row'};
  gap: ${GAP}px;
  scrollbar-width: none;
  ${vertical
    ? 'position: absolute; inset: 0; overflow-y: auto;'
    : 'position: relative; overflow-x: auto;'}

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const thumb = (theme: Theme, active: boolean) => css`
  flex: 0 0 auto;
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  padding: 0;
  overflow: hidden;
  border: 1px solid ${active ? theme.colors.blue : theme.palette.secondary.main};
  border-radius: 8px;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${theme.colors.blue};
    outline-offset: 1px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
