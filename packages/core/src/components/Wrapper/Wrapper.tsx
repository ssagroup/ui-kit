import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const Wrapper = styled.div<
  {
    avatarSize?: number;
    direction?: string;
    alignItems?: string;
    fade?: boolean;
    delay?: number;
  } & CommonProps
>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  width: 100%;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};

  ${({ fade, delay = 0.3 }) =>
    fade &&
    `
    opacity: 0;
    animation: fadeInOut ${delay}s ease-in-out forwards;

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
