import styled from '@emotion/styled';

export const PieChartLegendList = styled.ul<{ isFullscreenMode?: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: center;
  list-style: none;
  flex-direction: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'row' : 'column'};
  flex-wrap: ${({ isFullscreenMode }) => isFullscreenMode && 'wrap'};

  padding: 0;
  height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '100%')};
  margin: ${({ isFullscreenMode }) => (isFullscreenMode ? '40px 0 50px' : 0)};
  gap: ${({ isFullscreenMode }) => (isFullscreenMode ? '5px 20px' : '14px')};

  li {
    height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '20px')};
    display: flex;
    align-items: center;
    text-align: left;
    white-space: nowrap;
  }
`;
