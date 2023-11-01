import NavBarItem from '@components/NavBar/NavBarItem';
import styled from '@emotion/styled';

const CollapsibleNavBarItem = styled(NavBarItem)`
  align-items: flex-start;
  justify-content: flex-start;

  height: auto;
  min-height: 24px;
  padding: 12px 0;
  &:first-of-type: {
    padding-top: 0;
  }
  &:last-child: {
    padding-bottom: 0;
  }
`;

export default CollapsibleNavBarItem;
