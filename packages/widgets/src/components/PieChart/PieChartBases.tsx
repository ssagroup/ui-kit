import styled from '@emotion/styled';

export const PieChartBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: pink;

  & > .pie-chart-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
  }
`;

export const PieChartTextBase = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
