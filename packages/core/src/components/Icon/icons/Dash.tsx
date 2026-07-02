import { SVGProps } from '@components/Icon/types';

export const Dash = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(4.88, 11.07)">
      <path d="M0 2V0H14V2H0Z" fill={fill} />
    </g>
  </svg>
);

export const ICON_NAME = 'dash';
