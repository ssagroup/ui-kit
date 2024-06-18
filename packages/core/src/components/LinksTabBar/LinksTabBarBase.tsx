import styled from '@emotion/styled';
import { styleUtils } from '../..';

export const LinksTabBarBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    position: relative;
    padding: 8px 4px;
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

  a:focus-visible::before {
    ${({ theme }) => styleUtils.outlineStyles(theme, 'grey40', '6px', 'dashed')}
  }
`;
