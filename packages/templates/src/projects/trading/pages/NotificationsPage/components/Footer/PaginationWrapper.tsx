import styled from '@emotion/styled';

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    gap: 0;
  }
`;
