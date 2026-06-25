import { SVGProps } from '@components/Icon/types';

export const CloseCircleOutline = ({
  fill = '#000',
  size = 24,
  tooltip = 'Close Circle Outline',
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
    <g transform="translate(1.3, 1.3)">
      <path
        d="M10.7 20.7C16.2 20.7 20.7 16.2 20.7 10.7C20.7 5.2 16.2 0.7 10.7 0.7C5.2 0.7 0.7 5.2 0.7 10.7C0.7 16.2 5.2 20.7 10.7 20.7Z"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <g transform="translate(8.47, 8.47)">
      <path
        d="M0.7 6.36L6.36 0.7"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.36 6.36L0.7 0.7"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const ICON_NAME = 'close-circle-outline';
