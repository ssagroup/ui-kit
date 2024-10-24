import styled from '@emotion/styled';

export const PieChartLegendListItem = styled.li<{ isFullscreenMode?: boolean }>`
  display: flex;
  align-items: center;
  height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '22px')};
`;
