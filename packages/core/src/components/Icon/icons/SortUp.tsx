import { SVGProps } from '@components/Icon/types';

export const SortUp = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(5.25, 4.8) scale(2.4)">
      <path
        d="M3.24789 0.252232L5.55531 4.2295C5.75122 4.56719 5.51427 5 5.12012 5H0.505286C0.111141 5 -0.125807 4.56719 0.070099 4.2295L2.37752 0.252232C2.57263 -0.0840772 3.05278 -0.0840772 3.24789 0.252232Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'sort-up';
