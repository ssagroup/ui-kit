import { Theme, css } from '@emotion/react';

export const Bar = css`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

export const AdditionalBar = (theme: Theme) => css`
  position: absolute;
  right: 0;
  top: 0;
  height: 12px;
  background: ${theme.colors.red};
  border-radius: 10px;
`;

export const DistributionCard = (theme: Theme) => css`
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    ${theme.mediaQueries.md} {
      justify-content: space-around;
    }
    & > div {
      margin-bottom: 0;
    }
  }
`;

// ProgressBar styles
export const wrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.greyLighter};
  border-radius: 12px;
  box-shadow: inset 0 -1px 1px ${theme.colors.white30};
`;

export const bar = () => css`
  position: absolute;
  display: block;
  bottom: 0;
  border-radius: 12px;
`;
