import { SVGProps } from '@components/Icon/types';

export const MoreVertical = ({
  fill = '#000',
  size = 24,
  tooltip = 'More vertical',
  ...props
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size / 4}px`}
    height={`${size}px`}
    viewBox="0 0 4 16"
    fill="none"
    {...props}>
    <title>{tooltip}</title>
    <circle cx="1.66016" cy="2" r="1.5" fill={fill} />
    <circle cx="1.66016" cy="8" r="1.5" fill={fill} />
    <circle cx="1.66016" cy="14" r="1.5" fill={fill} />
  </svg>
);

export const ICON_NAME = 'more-vertical';
