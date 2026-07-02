import { SVGProps } from '@components/Icon/types';

export const ArrowSort = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(5.1, 9.9) scale(1, -1)">
      <path
        d="M12.9 0.9L6.9 6.9L0.9 0.9"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
    <g transform="translate(5.1, 14.1)">
      <path
        d="M12.9 0.9L6.9 6.9L0.9 0.9"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  </svg>
);

export const ICON_NAME = 'arrow-sort';
