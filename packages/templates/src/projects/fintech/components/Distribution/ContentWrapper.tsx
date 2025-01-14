import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 34px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 40px;
  }
`;
