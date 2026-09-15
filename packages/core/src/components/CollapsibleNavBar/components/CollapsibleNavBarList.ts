import styled from '@emotion/styled';
import NavBarList from '@components/NavBar/NavBarList';
import { CollapsibleNavBarExtendedProps } from '../types';

export const CollapsibleNavBarList = styled(NavBarList)<{
  navBarTheme?: CollapsibleNavBarExtendedProps['theme'];
}>`
  height: auto;
  padding: 0 0 0 15px;
  margin: 14px 0 0 0;
  /* 16px below the logo. The old 90/84px pair was reserving a second logo's
     worth of empty space — the two values differed only to cancel out the
     logo's own height difference across the breakpoint and land the first row
     at the same y. Both are the same gap now, so the rail keeps its spacing
     when it crosses into lg. */
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 16px;
    width: 100%;
    padding: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 16px;

    /* The header replaces the logo's gap entirely; the design leaves 24px
       between the header block and the first row. */
    &.has-header {
      margin-top: 24px;
    }
  }
`;
