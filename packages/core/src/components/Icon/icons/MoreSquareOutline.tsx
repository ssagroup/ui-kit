import { SVGProps } from '@components/Icon/types';

export const MoreSquareOutline = ({
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
        d="M7.7 20.7H13.7C18.7 20.7 20.7 18.7 20.7 13.7V7.7C20.7 2.7 18.7 0.7 13.7 0.7H7.7C2.7 0.7 0.7 2.7 0.7 7.7V13.7C0.7 18.7 2.7 20.7 7.7 20.7Z"
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

export const ICON_NAME = 'more-square-outline';
