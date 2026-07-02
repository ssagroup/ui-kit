import { SVGProps } from '@components/Icon/types';

export const NumberedList = ({
  fill = '#000',
  size = 24,
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(8.2, 5)">
      <path
        d="M4.39453 14H2.63477V1.91504L0 3.50977V1.5752L2.63477 0H4.39453V14Z"
        fill={fill}
      />
      <path d="M9.53223 14H7.62598V12.0947H9.53223V14Z" fill={fill} />
    </g>
  </svg>
);

export const ICON_NAME = 'numbered-list';
