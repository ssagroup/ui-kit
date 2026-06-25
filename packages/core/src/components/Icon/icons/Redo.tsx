import { SVGProps } from '@components/Icon/types';

export const Redo = ({
  fill = '#000',
  size = 24,
  tooltip = 'Redo',
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
    <g transform="translate(17.95, 4) scale(-1, 1)">
      <path
        d="M6.12207 0C8.36164 0.000293135 10.1777 1.81602 10.1777 4.05566V15.9072H9.17773V4.05566C9.17773 2.36831 7.80936 1.00029 6.12207 1C4.43453 1 3.06641 2.36813 3.06641 4.05566V4.94434H5.13184L2.56641 7.61133L0 4.94434H2.06641V4.05566C2.06641 1.81584 3.88225 0 6.12207 0Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'redo';
