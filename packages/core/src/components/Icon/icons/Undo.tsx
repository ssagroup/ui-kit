import { SVGProps } from '@components/Icon/types';

export const Undo = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(6, 4)">
      <path
        d="M6.15723 0C8.40848 0 10.234 1.825 10.2344 4.07617V15.999H9.23438V4.07617C9.23401 2.37729 7.85619 1 6.15723 1C4.45854 1.00033 3.08142 2.37749 3.08105 4.07617V4.9707H5.16211L2.58105 7.65332L0 4.9707H2.08105V4.07617C2.08142 1.82521 3.90625 0.000325912 6.15723 0Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'undo';
