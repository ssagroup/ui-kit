import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

export const AvatarContainer = styled.div<{ size: number } & CommonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: 50%;
  overflow: hidden;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const AvatarText = styled.span<{ fontSize: number }>`
  color: rgba(255, 255, 255, 1);
  font-family: Manrope, sans-serif;
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: 1;
  user-select: none;
  text-transform: uppercase;
`;
