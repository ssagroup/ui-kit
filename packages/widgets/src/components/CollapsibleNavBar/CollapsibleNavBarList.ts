import styled from '@emotion/styled';
import NavBarList from '@components/NavBar/NavBarList';

const CollapsibleNavBarList = styled(NavBarList)`
  height: auto;
  padding: 0 0 0 15px;
  margin: 5px 0 0 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 90px;
    width: 100%;
    padding: 0;
  }
`;

export default CollapsibleNavBarList;
