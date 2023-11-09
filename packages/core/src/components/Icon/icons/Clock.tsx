import { SVGProps } from '@components/Icon/types';

export const Clock = ({ fill = '#000', size = 15 }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none">
    <title>Clock</title>
    <circle
      cx="12.1001"
      cy="12.1001"
      r="11.1001"
      stroke={fill}
      strokeWidth="1.4"
    />
    <path
      d="M11.4824 6.18066L11.4835 13.1411"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M18.8843 11.4834L11.4842 13.3334"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
