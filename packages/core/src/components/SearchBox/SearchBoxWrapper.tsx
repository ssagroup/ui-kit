import styled from '@emotion/styled';

export const SearchBoxWrapper = styled.div`
  width: 139px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
  }
`;
