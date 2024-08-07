import { SVGProps } from '@components/Icon/types';

export const CarrotDown = ({
  fill = '#000',
  size = 24,
  tooltip = 'Carrot down',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 18 10"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M17 1L9 9L1 1"
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ICON_NAME = 'carrot-down';
