import styled from '@emotion/styled';

import { CommonProps } from '@global-types/emotion';

const Wrapper = styled.div<
  {
    avatarSize?: number;
    direction?: string;
    alignItems?: string;
    fade?: boolean;
    fadeDelay?: number;
  } & CommonProps
>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  width: 100%;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};

  ${({ fade, fadeDelay = 0.3 }) =>
    fade &&
    `
    opacity: 0;
    animation: fadeInOut ${fadeDelay}s ease-in-out forwards;

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
