import styled from '@emotion/styled';

import NavBarItem from '@components/NavBar/NavBarItem';

export const CollapsibleNavBarItem = styled(NavBarItem)`
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  min-height: 24px;
  padding: 12px 0;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
  & > a {
    height: 26px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    padding: 20px 0;
    width: 100%;
  }
`;
