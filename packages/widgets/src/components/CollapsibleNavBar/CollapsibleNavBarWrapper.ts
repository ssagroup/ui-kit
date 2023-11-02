import styled from '@emotion/styled';
import NavBarWrapper from '@components/NavBar/NavBarWrapper';

const CollapsibleNavBarWrapper = styled(NavBarWrapper)`
  transform: none;
  transition: unset;

  opacity: 0;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 1;
    height: 100%;
    width: 85px;
    top: auto;
    border-radius: 0;
    padding-top: 35px;
  }
`;

export default CollapsibleNavBarWrapper;
