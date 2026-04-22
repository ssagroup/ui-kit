import { css } from '@emotion/react';

export const FIRST_LINE_TOP_PADDING = 2;
export const FIRST_LINE_HEIGHT = 20;

export const container = css`
  display: flex;
  flex-direction: column;
`;

export const row = css`
  display: flex;
  align-items: stretch;
`;

export const leftColumn = (width: number) => css`
  position: relative;
  flex-shrink: 0;
  width: ${width}px;
`;

export const circle = (color: string, size: number, topOffset: number) => css`
  position: absolute;
  top: ${topOffset}px;
  left: 50%;
  transform: translateX(-50%);
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-color: ${color};
  z-index: 1;
`;

export const connector = (
  color: string,
  circleTopOffset: number,
  circleSize: number,
) => css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: ${circleTopOffset + circleSize / 2}px;
  bottom: -${circleTopOffset + circleSize / 2}px;
  width: 2px;
  background-color: ${color};
`;

export const dateColumn = (width: number) => css`
  width: ${width}px;
  flex-shrink: 0;
  padding-top: ${FIRST_LINE_TOP_PADDING}px;
  padding-bottom: 20px;
  font-size: 14px;
  line-height: ${FIRST_LINE_HEIGHT}px;
`;

export const contentColumn = css`
  flex: 1;
  padding-top: ${FIRST_LINE_TOP_PADDING}px;
  padding-bottom: 20px;
`;
