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

export const leftColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

export const circle = (color: string, size: number, topOffset: number) => css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-color: ${color};
  flex-shrink: 0;
  margin-top: ${topOffset}px;
`;

export const connector = (color: string) => css`
  flex: 1;
  width: 1px;
  background-color: ${color};
  min-height: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
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
