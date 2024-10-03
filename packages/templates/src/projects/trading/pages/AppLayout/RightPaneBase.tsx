import styled from '@emotion/styled';

export const RightPaneBase = styled.main`
  background: linear-gradient(
      143deg,
      #e7ebf1 -4.16%,
      #d7d9dd 39.37%,
      #cccdd2 52.66%,
      #e1e4ea 87.68%
    ),
    #f8f9fb;
  width: 100%;
  padding: 10px 9px 0 15px;
  overflow: hidden auto;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 10px 21px 0 35px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 10px 49px 0 36px;
  }

  ${({ theme }) => theme.mediaQueries.xlg} {
    padding: 10px 60px 0 62px;
  }
`;
