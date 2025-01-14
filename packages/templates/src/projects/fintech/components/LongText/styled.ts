import styled from '@emotion/styled';

export const TooltipTriggerContent = styled.div<{
  overflow: string | string[];
}>`
  font-weight: 500;
  font-size: 12px;
  max-width: 134px;
  overflow: ${({ overflow }) => overflow};
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;
