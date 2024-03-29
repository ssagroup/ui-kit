import styled from '@emotion/styled';

const IndicatorBase = styled.div<{ background?: string }>`
  position: absolute;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 5px;
  min-height: 5px;
  padding: 2px;
  border-radius: 50%;
  aspect-ratio: 1;
  background: ${({ theme, background }) =>
    background
      ? background
      : `linear-gradient(291.8deg, ${theme.colors.blueLightDarker}, ${theme.colors.blueDark})`};

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 8px;
    min-height: 8px;
    padding: 3px;
  }
`;

export default IndicatorBase;
