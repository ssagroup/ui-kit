import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const Avatar = styled.div<{ size: number; image: string } & CommonProps>`
  border-radius: 100px;

  overflow: hidden;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  background: ${({ image }) => `url(${image})`} center / contain no-repeat;
`;

export default Avatar;
