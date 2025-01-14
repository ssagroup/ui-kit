import styled from '@emotion/styled';

export const PlotTooltipWrapper = styled.div`
  position: absolute;
  border-radius: 3px;
  z-index: 1001;
`;

export const PlotTooltipContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 100px;
  & > div {
    display: grid;
    grid-template-columns: 1fr;
    font-size: 11px;
    line-height: 15px;
    font-weight: 600;
    color: #2b2d31cc;
    & .datetime {
      color: #808183;
    }
    & b {
      color: #2b2d31;
    }
    & .list {
      margin-top: 6px;
      & > ul {
        margin: 0;
        padding: 0;
        max-height: 100px;
        overflow: auto;
        & li::before {
          content: '-';
          padding-right: 4px;
        }
      }
    }
  }
`;
