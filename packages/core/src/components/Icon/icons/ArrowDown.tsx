import { SVGProps } from '@components/Icon/types';

export const ArrowDown = ({
  fill = '#000',
  size = 24,
  tooltip = 'Arrow Down',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 7 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M3.1779 7.07707L3.1779 0.922729"
      stroke={fill}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.93896 4.59485L3.17796 7.0771L0.416504 4.59485"
      stroke={fill}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ICON_NAME = 'arrow-down';
