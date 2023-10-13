import { css } from '@emotion/react';

export const StepConnectorWrapper = (inverted?: boolean) => css`
  position: absolute;
  top: 10px;

  left: calc(${inverted ? '50%' : '-50%'} + 16px);
  right: calc(${inverted ? '-50%' : '50%'} + 16px);
`;

export const StepConnectorLineVertical = (color?: string) => css`
  display: block;
  border-color: ${color};
  border-left-style: solid;
  border-left-width: 2px;
  min-height: 20px;
`;

export const StepConnectorLine = (color?: string) => css`
  display: block;
  border-color: ${color};
  border-top-width: 2px;
  border-top-style: solid;
`;
