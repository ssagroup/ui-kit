import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const Wrapper = styled.div<
  {
    avatarSize?: number;
    direction?: string;
    alignItems?: string;
    fade?: boolean;
  } & CommonProps
>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  width: 100%;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};

  ${({ fade }) =>
    fade &&
    `
    opacity: 0;
    animation: fadeInOut 0.3s ease-in-out forwards;

    @keyframes fadeInOut {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
`;

export default Wrapper;
