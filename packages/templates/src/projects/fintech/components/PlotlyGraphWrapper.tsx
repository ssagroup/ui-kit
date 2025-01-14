import styled from '@emotion/styled';

export const PlotlyGraphWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px 20px 17px 15px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  & > div {
    width: 100%;
    height: 100%;
    & .plotly {
      width: 100%;
      height: 100%;
    }
  }
`;
