import styled from '@emotion/styled';

export const PieChartBase = styled.div<{
  isFullscreenMode: boolean;
  width?: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: ${({ isFullscreenMode, width }) =>
    isFullscreenMode ? '100%' : width};

  flex-direction: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'column' : 'row'};

  height: 100%;

  height: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'calc(100% - 140px)' : 'auto'};
  max-height: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'calc(100% - 140px)' : 'none'};

  & > .pie-chart-wrapper {
    position: relative;
    width: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : '160px')};
    height: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : '160px')};

    & > div > div {
      display: ${({ isFullscreenMode }) =>
        isFullscreenMode ? 'flex' : 'block'};
      justify-content: ${({ isFullscreenMode }) =>
        isFullscreenMode ? 'center' : 'unset'};
    }
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
