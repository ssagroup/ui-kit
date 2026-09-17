import styled from '@emotion/styled';
import NavBarWrapper from '@components/NavBar/NavBarWrapper';
import { CollapsibleNavBarExtendedProps } from '../types';

export const CollapsibleNavBarWrapper = styled(NavBarWrapper)<{
  navBarTheme?: CollapsibleNavBarExtendedProps['theme'];
}>`
  transform: none;
  transition: unset;
  position: static;

  /* NavBarWrapper carries NavBar's own two-stop gradient. This rail is a
     different design, so pin the flat dark fill rather than inheriting it. */
  background: ${({ theme }) => theme.colors.greyDarker};

  display: none;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ navBarTheme }) => navBarTheme === 'light' && '#F4F5F9'};
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
