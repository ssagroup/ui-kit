import styled from '@emotion/styled';

export const PieChartLegendList = styled.ul<{ isFullscreenMode?: boolean }>`
  display: flex;
  justify-content: center;
  list-style: none;
  flex-flow: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'row wrap' : 'column nowrap'};

  padding: 0;
  height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '100%')};
  margin: ${({ isFullscreenMode }) => (isFullscreenMode ? '40px 0 50px' : 0)};
  gap: ${({ isFullscreenMode }) => (isFullscreenMode ? '0 20px' : 0)};

  li {
    height: 34px;
    display: flex;
    align-items: center;
    text-align: left;
    white-space: nowrap;
    padding-right: ${({ isFullscreenMode }) => isFullscreenMode && '12px'};
  }
`;
