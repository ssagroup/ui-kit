import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const NavBarLink = styled(NavLink)`
  cursor: pointer;

  &:hover {
    svg {
      filter: ${({ theme }) =>
        `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
    }
  }

  &.active {
    filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
    color: ${({ theme }) => theme.colors.white};

    svg {
      filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
      path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export default NavBarLink;
