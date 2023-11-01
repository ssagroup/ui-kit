import NavBarLink from '@components/NavBar/NavBarLink';
import styled from '@emotion/styled';

const CollapsibleNavBarLink = styled(NavBarLink)<{ active?: boolean }>`
  text-decoration: none;
  display: inline-flex;
  gap: 20px;
  color: ${({ theme }) => theme.colors.white80};

  & svg {
    & path: {
      fill: #a4a7ab;
    }
    & circle: {
      stroke: #a4a7ab;
    }
  }
  &:hover {
    svg {
      filter: ${({ theme }) =>
        `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
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
  }
`;

export default CollapsibleNavBarLink;
