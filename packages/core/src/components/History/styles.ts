import { css } from '@emotion/react';

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

export const circle = (color: string, size: number) => css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-color: ${color};
  flex-shrink: 0;
  margin-top: 3px;
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
  padding-top: 2px;
  padding-bottom: 20px;
  font-size: 14px;
  line-height: 20px;
`;

export const contentColumn = css`
  flex: 1;
  padding-top: 2px;
  padding-bottom: 20px;
`;
