import { SVGProps } from '@components/Icon/types';

export const Minus = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(3, 11.1)">
      <path
        d="M17.0996 0C17.5965 0 17.9997 0.402627 18 0.899414C18 1.39647 17.5967 1.7998 17.0996 1.7998H0.900391C0.403334 1.7998 0 1.39647 0 0.899414C0.000316605 0.402627 0.40353 0 0.900391 0H17.0996Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'minus';
