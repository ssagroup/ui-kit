import { css, Theme } from '@emotion/react';

import { InputBase } from './InputBase';

export const basic = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: `1px solid ${theme.colors.grey}`,
      '&:hover': {
        border: `1.4px solid ${theme.colors.greyDarker60}`,
      },
      '&:focus': {
        border: `2px solid ${theme.colors.grey40}`,
      },
    },
  });

export const error = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: 'double 1px transparent',
      backgroundImage: `linear-gradient(white, white),
      linear-gradient(to right, ${theme.colors.red}, ${theme.colors.redLighter})`,
      '&:hover': {
        border: 'double 1.4px transparent',
      },
      '&:focus': {
        border: 'double 2px transparent',
        backgroundImage: `linear-gradient(white, white),
        linear-gradient(
          to right,
          ${theme.colors.red40},
          ${theme.colors.redLighter40}
        )`,
      },
    },
  });

export const success = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: 'double 1px transparent',
      backgroundImage: `linear-gradient(white, white),
        linear-gradient(
          to right,
          ${theme.colors.greenLighter},
          ${theme.colors.green}
        )`,
      '&:hover': {
        border: 'double 1.4px transparent',
      },
      '&:focus': {
        border: 'double 2px transparent',
        backgroundImage: `linear-gradient(white, white),
          linear-gradient(
            to right,
            ${theme.colors.greenLighter40},
            ${theme.colors.green40}
          )`,
      },
    },
    svg: {
      stroke: `${theme.colors.green}`,
    },
  });

export const inputStatus = css`
  position: absolute;
  top: 34%;
  right: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  width: 14px;
  height: 14px;
`;

export const startElement = css`
  position: absolute;
  top: 0;
  left: 14px;

  height: 100%;
  width: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
`;

export const endElement = css`
  position: absolute;
  top: 0;
  right: 14px;

  height: 100%;
  width: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
`;
