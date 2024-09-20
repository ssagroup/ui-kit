import styled from '@emotion/styled';
import Badge from '@components/Badge';

export const PieChartLegendMarker = styled(Badge)<{ background?: string }>`
  display: inline-block;

  padding: 0;
  margin-right: 12px;

  width: 8px;
  height: 8px;

  background: ${({ background }) => background};
`;
