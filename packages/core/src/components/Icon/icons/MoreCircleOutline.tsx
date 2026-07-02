import { SVGProps } from '@components/Icon/types';

export const MoreCircleOutline = ({
  fill = '#000',
  size = 24,
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(1.3, 1.3)">
      <path
        d="M10.7 20.7C16.2 20.7 20.7 16.2 20.7 10.7C20.7 5.2 16.2 0.7 10.7 0.7C5.2 0.7 0.7 5.2 0.7 10.7C0.7 16.2 5.2 20.7 10.7 20.7Z"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <circle cx="8" cy="12" r="1" fill={fill} />
    <circle cx="12" cy="12" r="1" fill={fill} />
    <circle cx="16" cy="12" r="1" fill={fill} />
  </svg>
);

export const ICON_NAME = 'more-circle-outline';
