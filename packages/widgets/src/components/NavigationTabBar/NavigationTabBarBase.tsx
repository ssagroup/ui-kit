import styled from '@emotion/styled';

export const NavigationTabBarBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    font-size: 14px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.greyDropdownFocused};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    a {
      font-size: 18px;
    }
  }

  a.active {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.greyDarker};
    text-decoration: underline solid #2f6ce3;
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
  }
`;
