import styled from '@emotion/styled';

import Typography from '@components/Typography';

export const WidgetCardTitle = styled(Typography)`
  display: flex;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`;
