import styled from '@emotion/styled';

const Wrapper = styled.div<{
  avatarSize?: number;
  direction?: string;
  alignItems?: string;
}>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  width: 100%;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
`;

export default Wrapper;
