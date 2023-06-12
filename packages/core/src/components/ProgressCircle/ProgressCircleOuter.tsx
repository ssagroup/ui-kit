import styled from '@emotion/styled';

export const ProgressCircleOuter = styled.div<{
  size: number;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  border-radius: 50%;

  padding: ${({ size }) => size / 10}px;

  background: ${({ theme }) => theme.colors.greyLighter};
`;
