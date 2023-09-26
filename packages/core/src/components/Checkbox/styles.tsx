import { css, Theme } from '@emotion/react';

const blueInput = (theme: Theme) => css`
  & input:focus + div {
    box-shadow: -4px 4px 10px ${theme.colors.blueNotification40};
  }
  & input:disabled + div,
  & input:indeterminate:disabled + div {
    background: ${theme.colors.greyFocused};
  }
  & input:not(:checked, :indeterminate, :disabled) + div::before {
    border: 1.5px solid ${theme.colors.greyDropdownMain};
  }
  & input:not(:checked, :indeterminate, :disabled) + div:hover::before {
    border: 1.5px solid ${theme.colors.greyDropdownMain};
  }
  & input:not(:disabled):checked + div::before,
  & input:not(:disabled):indeterminate + div::before {
    background: ${theme.colors.blueNotification};
  }
  & input:not(:disabled):checked + div:hover::before {
    background: ${theme.colors.blueNotification};
  }
  & input:not(:disabled):checked + div + span {
    font-weight: 500;
    color: ${theme.colors.greyDropdownText};
  }
`;

const greenInput = (theme: Theme) => css`
  & input:focus + div {
    box-shadow: -4px 4px 10px ${theme.colors.green40};
  }

  & input:disabled + div,
  & input:indeterminate:disabled + div {
    background: ${theme.colors.greyFocused};
  }

  & input:not(:checked, :indeterminate, :disabled) + div::before {
    border: 1.5px solid ${theme.colors.green};
  }

  & input:not(:checked, :indeterminate, :disabled) + div:hover::before {
    border: 1.5px solid ${theme.colors.green60};
  }

  & input:not(:disabled):checked + div::before,
  & input:not(:disabled):indeterminate + div::before {
    background: linear-gradient(
      117.5deg,
      ${theme.colors.greenLighter} 17.12%,
      ${theme.colors.green} 85.53%
    );
  }

  & input:not(:disabled):checked + div:hover::before,
  & input:not(:disabled):indeterminate + div:hover::before {
    background: linear-gradient(
      117.5deg,
      ${theme.colors.greenLighter60} 17.12%,
      ${theme.colors.green60} 85.53%
    );
  }
`;

export const checkboxStyles = {
  blueInput,
  greenInput,
};
