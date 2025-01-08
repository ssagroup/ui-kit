import styled from '@emotion/styled';

export const DepartmentIndicatorWidgets = styled.div`
  display: grid;
  gap: 10.5px;

  grid-template-columns: calc(100% - 8px);

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, calc(50% - 8px));
  }
`;
