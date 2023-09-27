import styled from '@emotion/styled';

const TradingScoreboardBase = styled.div<{ itemsPerRow?: number }>`
  display: grid;
  gap: 10px;
  grid-template-columns: ${({ itemsPerRow }) =>
    itemsPerRow && `repeat(${itemsPerRow}, 1fr)`};
`;

export default TradingScoreboardBase;
