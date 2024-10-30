import styled from '@emotion/styled';
import Card from '@components/Card';

export const WidgetCardBase = styled(Card)<{
  isFullscreenMode?: boolean;
}>`
  border-radius: 20px;
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  position: ${({ isFullscreenMode }) =>
    isFullscreenMode ? 'absolute' : 'static'};
  top: ${({ isFullscreenMode }) => isFullscreenMode && 0};
  left: ${({ isFullscreenMode }) => isFullscreenMode && 0};

  z-index: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 10px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 12px 20px 11px;
  }

  box-shadow: 0 10px 40px 0 ${({ theme }) => theme.colors.greyShadow};
`;
