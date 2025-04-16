import styled from '@emotion/styled';

export const Brick = styled('div', {
  shouldForwardProp: (propName) => !propName.startsWith('$'),
})<{ $width: number; $color: string; $inactive: boolean }>`
  position: relative;
  height: 100%;
  width: ${({ $width }) => `${$width}px`};
  background: ${({ $color }) => $color};
  border-radius: 12px;
  overflow: hidden;

  opacity: ${({ $inactive }) => ($inactive ? 0.4 : 1)};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(85, 87, 90, 0.1);
    opacity: ${({ $inactive }) => ($inactive ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;
