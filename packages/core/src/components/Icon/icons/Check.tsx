import { SVGProps } from '@components/Icon/types';

export const Check = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    fill="none"
    viewBox="0 0 11 8"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>Check</title>
    <path
      d="M1 3.83L3.83 6.66L9.5 1"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
