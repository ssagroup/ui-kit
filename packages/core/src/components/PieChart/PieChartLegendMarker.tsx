import styled from '@emotion/styled';
import Badge from '@components/Badge';

export const PieChartLegendMarker = styled(Badge)<{
  background?: string;
  isFullscreenMode?: boolean;
}>`
  display: flex;
  align-self: center;
  margin-right: 12px;
  margin-left: 12px;
  margin-top: ${({ isFullscreenMode }) => !isFullscreenMode && '2px'};

  padding: 0;

  width: 8px;
  height: 8px;

  background: ${({ background }) => background};
`;
