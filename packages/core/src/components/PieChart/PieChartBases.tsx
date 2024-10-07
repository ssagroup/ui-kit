import styled from '@emotion/styled';

export const PieChartBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > .pie-chart-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
  }
`;

export const PieChartTextBase = styled.div`
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
