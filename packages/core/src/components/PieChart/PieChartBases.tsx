import styled from '@emotion/styled';

export const PieChartBase = styled.div<{
  isFullscreenMode: boolean;
  width?: number;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: ${({ isFullscreenMode, width }) =>
    isFullscreenMode ? '100%' : width};

  flex-direction: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'column' : 'row'};

  & > .pie-chart-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
  }
`;

export const PieChartTextBase = styled.div<{ isFullscreenMode: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: calc(100% - 34px);
  height: calc(100% - 34px);
  left: 17px;
  top: 17px;
  border-radius: 50%;
`;
