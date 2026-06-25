import { SVGProps } from '@components/Icon/types';

export const BulletedList = ({
  fill = '#000',
  size = 24,
  tooltip = 'Bulleted List',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{tooltip}</title>
    <g transform="translate(10, 10)">
      <path
        d="M2.04 4C1.66133 4 1.31733 3.912 1.008 3.736C0.704 3.56 0.458667 3.32267 0.272 3.024C0.0906668 2.72 0 2.37867 0 2C0 1.62133 0.0906668 1.28 0.272 0.976C0.458667 0.672 0.704 0.434666 1.008 0.263999C1.31733 0.0879994 1.66133 0 2.04 0C2.392 0 2.71733 0.0879994 3.016 0.263999C3.31467 0.434666 3.552 0.672 3.728 0.976C3.90933 1.28 4 1.62133 4 2C4 2.37867 3.90933 2.72 3.728 3.024C3.552 3.32267 3.31467 3.56 3.016 3.736C2.71733 3.912 2.392 4 2.04 4Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'bulleted-list';
