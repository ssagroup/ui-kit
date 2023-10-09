import styled from '@emotion/styled';

const IndicatorBase = styled.div<{ position?: string; background?: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 8px;
  min-height: 8px;
  padding: 3px;
  border-radius: 50%;
  aspect-ratio: 1;
  transform: ${({ position }) =>
    position === 'right' ? 'translate(50%, -50%)' : 'translate(-50%, -50%)'};
  background: ${({ theme, background }) =>
    background
      ? background
      : `linear-gradient(291.8deg, ${theme.colors.blueLightDarker}, ${theme.colors.blueDark})`};
`;

export default IndicatorBase;
