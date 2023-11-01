import NavBarWrapper from '@components/NavBar/NavBarWrapper';
import styled from '@emotion/styled';

const CollapsibleNavBarWrapper = styled(NavBarWrapper)`
  transform: none;
  transition: unset;

  opacity: 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`;

export default CollapsibleNavBarWrapper;
