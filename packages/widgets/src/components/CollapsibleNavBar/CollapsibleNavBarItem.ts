import styled from '@emotion/styled';
import NavBarItem from '@components/NavBar/NavBarItem';

const CollapsibleNavBarItem = styled(NavBarItem)`
  align-items: flex-start;
  justify-content: flex-start;

  height: auto;
  min-height: 24px;
  padding: 12px 0;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: center;
    padding: 20px 0;
    width: 100%;
  }
`;

export default CollapsibleNavBarItem;
