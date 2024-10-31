import styled from '@emotion/styled';

export const PieChartBase = styled.div<{
  isFullscreenMode: boolean;
  width?: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  flex-direction: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'column' : 'row'};

  width: ${({ isFullscreenMode, width }) =>
    isFullscreenMode ? '100%' : width};
  height: 100%;

  height: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : 'auto')};
  max-height: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : 'none')};

  & > .pie-chart-wrapper {
    position: relative;
    width: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : '160px')};

    ${({ theme }) => theme.mediaQueries.md} {
      margin-bottom: 6px;
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      margin-bottom: 0;
    }
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
