import { SVGProps } from '@components/Icon/types';

export const CarrotLeft = ({
  fill = '#000',
  size = 24,
  tooltip = 'Carrot left',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 11 18"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M9.5 0.999999L1.5 9L9.5 17"
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ICON_NAME = 'carrot-left';
