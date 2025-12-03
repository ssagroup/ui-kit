import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const Wrapper = styled.div<
  {
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

  ${({ isVisible = true, fade, fadeDelay = 0.3 }) => {
    const baseStyles = `
      opacity: ${isVisible ? 1 : 0};
    `;

    if (fade) {
      return `
        ${baseStyles}
        transition: opacity ${fadeDelay}s ease-in-out, visibility ${fadeDelay}s ease-in-out;
        visibility: ${isVisible ? 'visible' : 'hidden'};
        ${!isVisible ? `transition-delay: 0s, ${fadeDelay}s;` : ''}
      `;
    }

    return `
      ${baseStyles}
      visibility: ${isVisible ? 'visible' : 'hidden'};
    `;
  }}
`;

export default Wrapper;
