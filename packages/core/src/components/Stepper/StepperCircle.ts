import styled from '@emotion/styled';

import theme from '@themes/main';

export const StepperCircle = styled.div<{ done?: boolean; color: string }>`
  position: relative;

  background: ${({ done, color }) =>
    done ? theme.colors[color] : theme.colors.greyLighter};
  color: ${theme.colors.white};
  text-align: center;

  top: 10px;

  width: 0.5em;
  height: 0.5em;

  line-height: 1.5em;
  border-radius: 100%;

  &::after {
    content: ' ';
    position: absolute;
    display: block;
    top: 0;
    height: 100%;
    left: 0;
    -webkit-transform: scale(1, 3);
    -moz-transform: scale(1, 3);
    -ms-transform: scale(1, 3);
    transform: scale(1, 3);
    transform-origin: 50% 0;
    border-left: 1px dashed rgba(43, 45, 49, 0.8);
  }

  &:after {
    position: absolute;
    display: block;
    top: 100%;
    height: 100%;
    left: 45%;
    transform: scale(1, 3);
    transform-origin: 50% 0;
    border-left: 1px dashed black;
  }
`;
