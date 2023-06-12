import styled from '@emotion/styled';

export const ProgressCircleInner = styled.div<{
  size: number;
}>`
  width: ${({ size }) => size - (size / 10) * 2}px;
  height: ${({ size }) => size - (size / 10) * 2}px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #fff;
`;
