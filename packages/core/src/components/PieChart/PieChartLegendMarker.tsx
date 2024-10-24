import styled from '@emotion/styled';
import Badge from '@components/Badge';

export const PieChartLegendMarker = styled(Badge)<{
  background?: string;
  isFullscreenMode?: boolean;
}>`
  display: flex;
  align-self: center;
  margin-top: ${({ isFullscreenMode }) => !isFullscreenMode && '2px'};

  padding: 0;
  margin-right: ${({ isFullscreenMode }) =>
    isFullscreenMode ? '5px' : '12px'};

  width: 8px;
  height: 8px;

  background: ${({ background }) => background};
`;
