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
        borderColor: theme.palette.primary.main,
      },
    },
  });

export const error = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: `1px solid ${theme.palette.error.light}`,
      '&:hover': {
        borderColor: theme.palette.error.main,
      },
      '&:focus': {
        borderColor: theme.palette.error.dark,
      },
    },
  });

export const success = (theme: Theme) =>
  css({
    [`& ${InputBase}`]: {
      border: `1px solid ${theme.palette.success.light}`,
      '&:hover': {
        borderColor: theme.palette.success.main,
      },
      '&:focus': {
        borderColor: theme.palette.success.dark,
      },
    },
    svg: {
      stroke: theme.palette.success.main,
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

  button {
    padding: 0;
  }
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

  button {
    padding: 0;
  }
`;
