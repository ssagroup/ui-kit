import styled from '@emotion/styled';

export const TooltipContentBase = styled.div`
  line-height: 0.75rem; /* 12px */
  background: ${({ theme }) => theme.colors.greyLighter};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-weight: 600;
`;
