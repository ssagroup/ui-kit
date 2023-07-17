import { css } from '@emotion/react';

export const label = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const labelIcon = css`
  display: flex;
  height: 22px;

  align-items: center;
`;
export const labelIconVertical = css`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  margin-right: 5px;
`;
export const labelText = css`
  text-align: center;
`;
export const labelTitle = (color) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  border-radius: 50%;
  background-color: ${color};
`;
