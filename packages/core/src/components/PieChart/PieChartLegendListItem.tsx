import styled from '@emotion/styled';

export const PieChartLegendListItem = styled.li<{ isFullscreenMode?: boolean }>`
  display: flex;
  align-items: center;
  height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '22px')};
  & > h6 {
    place-items: center;
    height: 100%;
    &:nth-of-type(1) {
      margin-right: 5px;
      font-size: 14px;
    }
    &:nth-of-type(2) {
      font-size: 10px;
      font-weight: 600;
    }
  }
`;
