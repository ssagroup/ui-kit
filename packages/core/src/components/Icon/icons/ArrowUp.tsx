import { SVGProps } from '@components/Icon/types';

export const ArrowUp = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 7 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>Arrow Up</title>
    <path
      d="M3.17757 0.92293L3.17757 7.07727"
      stroke={fill}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.416507 3.40515L3.17751 0.922901L5.93896 3.40515"
      stroke={fill}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
