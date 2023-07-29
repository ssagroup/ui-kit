import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NavBarLink = styled(Link)<{ active?: boolean }>`
  cursor: pointer;

  &:hover {
    svg {
      filter: ${({ theme }) =>
        `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
    }
  }

  ${({ active, theme }) =>
    active &&
    `
      svg {
        filter: drop-shadow(-4px 4px 14px ${theme.colors.white});
        
        path {
          fill: ${theme.colors.white};
        }
      }
    `}
`;

export default NavBarLink;
