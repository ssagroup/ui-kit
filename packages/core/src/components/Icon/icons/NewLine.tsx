import { SVGProps } from '@components/Icon/types';

export const NewLine = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(5, 8)">
      <path d="M12 0V6H5V8.38672L0 5.5L5 2.61328V5H11V0H12Z" fill={fill} />
    </g>
  </svg>
);

export const ICON_NAME = 'new-line';
