import Checkbox, { ICheckboxProps } from '@components/Checkbox';
import theme from '@themes/main';
import { css } from '@emotion/react';

const getStyles = () => css`
  margin: 0 0 14px;
  & span {
    margin-left: 16px;
    color: #55575a;
    user-select: none;
  }
  & input + div {
    border-radius: 2px;
    &::before {
      border-radius: 2px;
    }
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
  & input:focus + div {
    box-shadow: -4px 4px 10px ${theme.colors.blueNotification40};
  }
`;

export const TableFilterCheckbox = (props: ICheckboxProps) => {
  const styles = getStyles();
  return <Checkbox {...props} css={styles} />;
};
