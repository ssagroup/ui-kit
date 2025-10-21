import { css, Theme } from '@emotion/react';

export const WrapperStyle = (theme: Theme) => css`
  background: ${theme.colors.white};
  min-width: 140px;
  color: ${theme.colors.greyDarker};
  font-weight: 500;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 ${theme.colors.black25};
  & span {
    margin-right: 10px !important;
  }
`;
