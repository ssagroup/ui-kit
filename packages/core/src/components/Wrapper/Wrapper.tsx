import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const Wrapper = styled.div<
  {
    avatarSize?: number;
    direction?: string;
    alignItems?: string;
    fade?: boolean;
    fadeDelay?: number;
    isVisible?: boolean;
  } & CommonProps
>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  width: 100%;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  ${({ isVisible = true }) => {
    return `
      opacity: ${isVisible ? 1 : 0};
      pointer-events: ${isVisible ? 'auto' : 'none'};
    `;
  }}

  ${({ fade, fadeDelay = 0.3 }) => {
    if (!fade) return '';

    return `
      transition: opacity ${fadeDelay}s ease-in-out;
    `;
  }}
`;

export default Wrapper;
