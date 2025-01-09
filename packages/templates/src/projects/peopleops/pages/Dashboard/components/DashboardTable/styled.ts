import { TradingScoreboard as TradingScoreboardOriginal } from '@ssa-ui-kit/widgets';
import styled from '@emotion/styled';

export const TradingScoreboard = styled(TradingScoreboardOriginal)`
  gap: 4px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: inherit;
  overflow: inherit;
  & div[role='button'] {
    cursor: default;
    white-space: normal;
    width: 100%;
    height: 100%;
    ${({ theme }) => theme.mediaQueries.md} {
      white-space: nowrap;
    }
    &:active {
      background: ${({ theme }) => theme.colors.greyLighter};
    }
    & h5 {
      font-size: 15px;
      overflow-wrap: anywhere;
      line-height: 1.375rem;
      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 18px;
        line-height: 1.5rem;
      }
    }
    & h6 {
      font-size: 14px;
      overflow-wrap: anywhere;
      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 16px;
      }
    }
    & > div:first-of-type {
      min-height: 24px;
    }
    & p {
      margin-bottom: 0;
      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 11.5px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 12px;
      }
    }
  }
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(7, 1fr);
  }
`;
