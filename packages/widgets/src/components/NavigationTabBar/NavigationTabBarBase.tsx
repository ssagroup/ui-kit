import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const NavigationTabBarBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    font-size: 18px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.greyDropdownFocused};
  }

  a.active {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.greyDarker};
    text-decoration: underline solid #2f6ce3;
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
  }
`;
// TODO: check text-decoration support

export const LinkStyle = css``;
