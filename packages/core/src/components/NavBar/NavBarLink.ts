import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const NavBarLink = styled(NavLink)`
  cursor: pointer;
  overflow: visible;

  /* Collapses the inline line-height box so the link is exactly the glyph's
     24px, which is what makes the list's 42px gap land on the design's 66px
     row pitch. */
  display: flex;

  svg {
    /* safari fix for :hover*/
    transform: translate3d(0, 0, 0);
  }

  &:not(.active):hover {
    svg {
      filter: drop-shadow(0 0 14px ${({ theme }) => theme.colors.white});
    }
  }

  &.active {
    cursor: default;
    backdrop-filter: blur(0);
    color: ${({ theme }) => theme.colors.white};

    svg {
      filter: drop-shadow(0 0 14px ${({ theme }) => theme.colors.white});

      & path {
        fill: ${({ theme }) => theme.colors.white};
      }
      & circle {
        stroke: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export default NavBarLink;
