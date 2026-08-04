import type { ComponentProps } from 'react';
import styled, { type StyledComponent } from '@emotion/styled';
import { HRTableCell } from '@hr/components';

// Explicit annotation: without it the inferred type names core's internal dist
// path, which is not portable in the emitted declarations (TS2742).
export const EventInfoCell: StyledComponent<
  ComponentProps<typeof HRTableCell>
> = styled(HRTableCell)`
  padding: 0;
  background: inherit;
  height: 34px;
  &:first-of-type {
    border-top-left-radius: 6px !important;
    border-bottom-left-radius: 6px !important;
  }
  &:last-of-type {
    border-top-right-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 12px;
  }
`;
