import { SVGProps } from '@components/Icon/types';

export const MoreVertical = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size / 4}
    height={size}
    viewBox={`0 0 ${size / 4} ${size}`}
    fill="none">
    <circle cx="1.66016" cy="2" r="1.5" fill={fill} />
    <circle cx="1.66016" cy="8" r="1.5" fill={fill} />
    <circle cx="1.66016" cy="14" r="1.5" fill={fill} />
  </svg>
);
