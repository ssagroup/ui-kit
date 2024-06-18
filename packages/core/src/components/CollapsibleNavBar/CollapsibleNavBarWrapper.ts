import styled from '@emotion/styled';
import NavBarWrapper from '@components/NavBar/NavBarWrapper';

const CollapsibleNavBarWrapper = styled(NavBarWrapper)`
  transform: none;
  transition: unset;
  position: static;

  display: none;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    min-height: 100vh;
    width: 85px;
    border-radius: 0;
    padding-top: 35px;
  }
`;

export default CollapsibleNavBarWrapper;
