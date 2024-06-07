import styled from '@emotion/styled';
import NavBarLink from '@components/NavBar/NavBarLink';

const CollapsibleNavBarLink = styled(NavBarLink)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.colors.white80};

  svg {
    backdrop-filter: blur(0);
  }

  &:not(.active):hover {
    backdrop-filter: blur(0);
    filter: ${({ theme }) =>
      `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
    color: ${({ theme }) => theme.colors.white};

    svg {
      & path {
        fill: ${({ theme }) => theme.colors.white};
      }
      & circle {
        stroke: ${({ theme }) => theme.colors.white};
      }
    }
  }

  & > span {
    color: ${({ theme }) => theme.colors.white80};

    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }
  }
`;

export default CollapsibleNavBarLink;
