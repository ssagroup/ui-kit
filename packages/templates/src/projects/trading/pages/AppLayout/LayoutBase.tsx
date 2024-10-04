import styled from '@emotion/styled';

export const LayoutBase = styled.div`
  display: flex;
  height: 100%;
  position: relative;

  > nav {
    padding-top: 5px;
    & ul {
      background: none;
      & > li {
        background: none;
      }
    }

    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0;
    }
  }
`;
