import { SVGProps } from '@components/Icon/types';

export const RadioOn = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 21"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg">
    <title>Radio on</title>
    <rect x="0.7" y="1.39995" width="18.6" height="18.6" rx="9.3" fill={fill} />
    <rect
      x="0.7"
      y="1.39995"
      width="18.6"
      height="18.6"
      rx="9.3"
      stroke={fill}
      strokeWidth="1.4"
    />
    <circle cx="10" cy="10.7" r="5" fill={fill} />
  </svg>
);
