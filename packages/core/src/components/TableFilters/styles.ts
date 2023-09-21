import { css } from '@emotion/react';

import theme from '@themes/main';

export const tableFilterPopoverContentStyles = css`
  border: 1px solid ${theme.colors.greyDropdownMain};
  border-radius: 20px;
  padding: 20px 20px 14px 18px;
  width: 340px;
  background: ${theme.colors.white};
`;

export const tableFilterDividerStyles = css`
  border: 1px solid ${theme.colors.greyDropdownMain};
  width: calc(100% + 38px);
  margin: 22px auto 14px -19px;
`;

export const baseButtonStyle = css`
  padding: 0 14px;
  height: 38px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    box-shadow: none;
  }
`;
