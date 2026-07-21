import Input from '@components/Input';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

/** 26px-tall cell shared by page/selected/arrow buttons (design "Number" atom); width grows past 26 to fit multi-digit page numbers instead of clipping/overlapping. */
const baseBtnStyles = {
  minWidth: 26,
  height: 26,
  padding: '0 4px',
  borderRadius: 6,
  justifyContent: 'center',

  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: '18px',
};

/** Shared by every `&:disabled` block below so it survives merging into one object. */
const disabledCursor = {
  cursor: 'default',
};

export const pageBtnStyles = (theme: Theme) =>
  css({
    ...baseBtnStyles,

    background: 'transparent',
    boxShadow: 'unset',
    color: theme.colors.greyDarker,

    '&:disabled': {
      ...disabledCursor,
      background: theme.palette.secondary.main,
      color: theme.colors.grey,
      boxShadow: 'unset',
    },

    '&:not(:disabled):hover, &:not(:disabled):active, &:not(:disabled):focus': {
      background: theme.palette.secondary.light,
      boxShadow: 'unset',
    },
  });

export const selectedPageBtnStyles = (theme: Theme) =>
  css({
    ...baseBtnStyles,

    background: theme.palette.primary.main,
    color: theme.colors.white,

    '&:disabled': {
      ...disabledCursor,
      background: theme.palette.primary.main,
    },

    '&:hover, &:active, &:focus': {
      background: theme.palette.primary.dark,
    },

    '&:not(:disabled):hover': {
      cursor: 'default',
    },
  });

export const arrowBtnStyles = css({
  ...baseBtnStyles,

  background: 'transparent',

  '&:disabled': {
    ...disabledCursor,
    background: 'transparent',
  },

  '&:not(:disabled):hover': {
    cursor: 'pointer',
  },
});

/** Ellipsis ("...") cell rendered between page-number breaks; sized to match a Number cell. */
export const breakStyles = (theme: Theme) =>
  css({
    ...baseBtnStyles,

    display: 'inline-flex',
    alignItems: 'center',
    background: 'transparent',
    color: theme.colors.greyDarker,
    cursor: 'default',
  });

export const PaginationNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 38px;
`;

export const PageNumberInput = styled(Input)`
  width: 80px;
  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus,
  &:hover {
    border-width: 1px !important;
  }
  & + div {
    right: 24px;
  }
`;
