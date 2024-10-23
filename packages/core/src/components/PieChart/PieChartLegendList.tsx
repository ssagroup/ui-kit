import styled from '@emotion/styled';

export const PieChartLegendList = styled.ul<{ isFullscreenMode?: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: center;
  list-style: none;

  height: 100%;
  padding: 0;
  margin: 0;
  gap: 14px;

  li {
    height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '20px')};
    display: flex;
    align-items: center;
    text-align: left;
  }
`;
