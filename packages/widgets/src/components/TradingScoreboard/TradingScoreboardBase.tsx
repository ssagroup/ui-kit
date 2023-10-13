import styled from '@emotion/styled';

const TradingScoreboardBase = styled.div<{ itemsPerRow?: number }>`
  display: grid;
  gap: 5px;
  grid-auto-flow: column;
  overflow: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ itemsPerRow }) =>
      itemsPerRow && `repeat(${itemsPerRow}, 1fr)`};
    grid-auto-flow: inherit;
    overflow: inherit;
  }
`;

export default TradingScoreboardBase;
