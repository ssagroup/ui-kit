import { SVGProps } from '@components/Icon/types';

export const Menu = ({
  fill = '#000',
  size = 24,
  tooltip = 'Menu',
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
    <g transform="translate(3.1, 5.1)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.9C0 0.402944 0.402944 0 0.9 0H16.9C17.3971 0 17.8 0.402944 17.8 0.9C17.8 1.39706 17.3971 1.8 16.9 1.8H0.9C0.402944 1.8 0 1.39706 0 0.9Z"
        fill={fill}
      />
    </g>
    <g transform="translate(3.1, 11.1)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.9C0 0.402944 0.402944 0 0.9 0H16.9C17.3971 0 17.8 0.402944 17.8 0.9C17.8 1.39706 17.3971 1.8 16.9 1.8H0.9C0.402944 1.8 0 1.39706 0 0.9Z"
        fill={fill}
      />
    </g>
    <g transform="translate(3.1, 17.1)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.9C0 0.402944 0.402944 0 0.9 0H16.9C17.3971 0 17.8 0.402944 17.8 0.9C17.8 1.39706 17.3971 1.8 16.9 1.8H0.9C0.402944 1.8 0 1.39706 0 0.9Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'menu';
