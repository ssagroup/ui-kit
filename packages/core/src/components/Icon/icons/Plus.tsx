import { SVGProps } from '@components/Icon/Icons.types';

export const Plus = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Plus</title>
    <path
      d="M1 5H9"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 9V1"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
