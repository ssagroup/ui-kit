import { SVGProps } from '@components/Icon/Icons.types';

export const Circle = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 21"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg">
    <title>Circle</title>
    <rect x="0.7" y="1.39995" width="18.6" height="18.6" rx="9.3" fill="none" />
    <rect
      x="0.7"
      y="1.39995"
      width="18.6"
      height="18.6"
      rx="9.3"
      stroke={fill}
      strokeWidth="1.4"
    />
  </svg>
);
