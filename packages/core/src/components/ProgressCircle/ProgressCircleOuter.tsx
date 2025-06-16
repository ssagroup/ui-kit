import styled from '@emotion/styled';

export const ProgressCircleOuter = styled.div<{
  size: number;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  border: ${({ size }) => size / 10}px solid
    ${({ theme }) => theme.colors.greyLighter};
  border-radius: 50%;

  background: none;
`;
