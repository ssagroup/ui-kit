import { SVGProps } from '@components/Icon/types';

export const Info = ({
  fill = '#000',
  size = 24,
  tooltip = 'Info',
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
    <g transform="translate(10.996, 7.15)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.11133 1.99512L1.00879 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H1.00879L1.11133 0.00488281C1.61555 0.0561264 2.00879 0.482258 2.00879 1C2.00879 1.51774 1.61555 1.94387 1.11133 1.99512ZM0.305176 9V4C0.305176 3.6134 0.618772 3.2998 1.00537 3.2998C1.39197 3.2998 1.70557 3.6134 1.70557 4V9C1.70557 9.3866 1.39197 9.7002 1.00537 9.7002C0.618772 9.7002 0.305176 9.3866 0.305176 9Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'info';
