import styled from '@emotion/styled';
import { CommonProps } from '../..';

const Wrapper = styled.div<
  {
    avatarSize?: number;
    direction?: string;
    alignItems?: string;
  } & CommonProps
>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  width: 100%;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
`;

export default Wrapper;
