import { SVGProps } from '@components/Icon/types';

export const Italic = ({
  fill = '#000',
  size = 24,
  tooltip = 'Italic',
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
    <g transform="translate(9.5, 5)">
      <path d="M3.73333 0H5.49306L1.75972 14H0L3.73333 0Z" fill={fill} />
    </g>
  </svg>
);

export const ICON_NAME = 'italic';
