import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { ColorsKeys } from '../..';

const generateGradient = (svgOffset: number) => keyframes`
  100% {
    stroke-dashoffset: ${svgOffset};
  }
`;

const generateInfinite = () => keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

export const ProgressCircleBase = styled.div<{
  gradientId: string;
  fullStroke: number;
  svgOffset: number;
  color: string;
  size: number;
  mode: 'default' | 'infinite';
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  position: relative;

  animation: ${() => generateInfinite()} 2s linear infinite forwards;
  animation: ${({ mode }) => mode === 'default' && 'none'};

  svg {
    position: absolute;
    top: 0;
    left: 0;

    filter: ${({ theme, color }) =>
      `drop-shadow(3px 5px 10px ${
        theme.colors[`${color}Lighter40` as ColorsKeys] ||
        theme.colors[color as ColorsKeys]
      })`};
  }

  circle {
    fill: none;

    stroke: url(#${({ gradientId }) => gradientId});
    stroke-width: ${({ size }) => size / 10}px;
    stroke-linecap: round;
    stroke-dasharray: ${({ fullStroke }) => fullStroke};
    stroke-dashoffset: ${({ fullStroke }) => fullStroke};
    animation: ${({ svgOffset }) => generateGradient(svgOffset)} 1s linear
      forwards;
    animation-direction: ${({ mode }) =>
      mode === 'infinite' && 'reverse !important'};
    animation-play-state: ${({ mode }) =>
      mode === 'infinite' && 'paused !important'};
  }
`;
