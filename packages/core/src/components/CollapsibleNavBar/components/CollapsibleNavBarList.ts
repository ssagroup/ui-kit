import styled from '@emotion/styled';

import NavBarList from '@components/NavBar/NavBarList';

import { CollapsibleNavBarExtendedProps } from '../types';

export const CollapsibleNavBarList = styled(NavBarList)<{
  navBarTheme?: CollapsibleNavBarExtendedProps['theme'];
}>`
  height: auto;
  padding: 0 0 0 15px;
  margin: 14px 0 0 0;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 90px;
    width: 100%;
    padding: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 84px;
  }
`;
