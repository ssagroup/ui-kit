import { css, Theme } from '@emotion/react';

import { InputBase } from './InputBase';

export const basic = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: `1px solid ${theme.colors.grey}`,
      '&:hover': {
        borderColor: theme.colors.greyDarker80,
      },
      '&:focus': {
        borderColor: theme.colors.blueRoyal,
      },
    },
  });

export const error = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: `1px solid ${theme.colors.dangerShades300}`,
      '&:hover': {
        borderColor: theme.colors.dangerShades500,
      },
      '&:focus': {
        borderColor: theme.colors.dangerShades700,
      },
    },
  });

export const success = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: `1px solid ${theme.colors.green}`,
      '&:hover': {
        borderColor: theme.colors.successShades500,
      },
      '&:focus': {
        borderColor: theme.colors.successShades700,
      },
    },
    svg: {
      stroke: `${theme.colors.green}`,
    },
  });

export const custom = () => css({});

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
