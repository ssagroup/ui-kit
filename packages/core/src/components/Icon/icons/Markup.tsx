import { SVGProps } from '@components/Icon/types';

export const Markup = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(0, 5.6)">
      <path
        d="M11.1104 12.6465H9.52148L12.8936 0H14.4834L11.1104 12.6465Z"
        fill={fill}
      />
      <path
        d="M5.1377 3.93457L1.90527 7.11328L5.1377 10.293L4.1543 11.2676L0 7.11328L4.1543 2.95996L5.1377 3.93457Z"
        fill={fill}
      />
      <path
        d="M24 7.11328L19.8457 11.2676L18.8623 10.293L22.0947 7.11328L18.8623 3.93457L19.8457 2.95996L24 7.11328Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'markup';
