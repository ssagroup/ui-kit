import styled from '@emotion/styled';
import { Card } from '@ssa-ui-kit/core';

export const WidgetCardBase = styled(Card)`
  border-radius: 20px;
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 40px 0 ${({ theme }) => theme.colors.greyShadow};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 10px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 12px 20px 11px;
  }
`;
