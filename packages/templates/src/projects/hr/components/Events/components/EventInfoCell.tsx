import styled from '@emotion/styled';
import { HRTableCell } from '@hr/components';

export const EventInfoCell = styled(HRTableCell)`
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
