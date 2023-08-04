import styled from '@emotion/styled';

export const BmiPointer = styled.div<{ percentage: number }>`
  position: absolute;

  left: ${({ percentage }) => percentage}%;
  top: 0;

  width: 14px;
  height: 14px;

  background: #2b2d31;
  box-shadow: -4px 4px 10px rgba(42, 48, 57, 0.2);
  border-radius: 19px;
`;
