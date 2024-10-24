import styled from '@emotion/styled';
import CardContent from '@components/CardContent';

export const Content = styled(CardContent)<{ isFullscreenMode?: boolean }>`
  max-width: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : '406px')};
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  height: ${({ isFullscreenMode }) => (isFullscreenMode ? '100%' : 'auto')};

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: initial;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: initial;
  }
`;
