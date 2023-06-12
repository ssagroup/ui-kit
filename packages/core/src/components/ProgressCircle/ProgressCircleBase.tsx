import styled from '@emotion/styled';

export const ProgressCircleBase = styled.div<{
  gradientId: string;
  fullStroke: number;
  svgOffset: number;
  color: string;
  size: number;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  position: relative;

  svg {
    position: absolute;
    top: 0;
    left: 0;

    filter: ${({ theme, color }) =>
      `drop-shadow(3px 5px 10px ${theme.colors[`${color}Lighter40`]})`};
  }

  circle {
    fill: none;

    stroke: url(#${({ gradientId }) => gradientId});
    stroke-width: ${({ size }) => size / 10}px;
    stroke-linecap: round;
    stroke-dasharray: ${({ fullStroke }) => fullStroke};
    stroke-dashoffset: ${({ fullStroke }) => fullStroke};

    animation: ${({ gradientId }) => gradientId} 1s linear forwards;
  }

  @keyframes ${({ gradientId }) => gradientId} {
    100% {
      stroke-dashoffset: ${(props) => props.svgOffset};
    }
  }
`;
