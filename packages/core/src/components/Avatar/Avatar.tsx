import styled from '@emotion/styled';

const Avatar = styled.div<{ size: number; image: string }>`
  border-radius: 100px;

  overflow: hidden;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  background: ${({ image }) => `url(${image})`} center no-repeat;
`;

export default Avatar;
