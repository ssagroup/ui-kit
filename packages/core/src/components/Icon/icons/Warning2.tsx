import { SVGProps } from '@components/Icon/types';

export const Warning2 = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(10.996, 7.15)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.305176 0.700195V5.7002C0.305176 6.08679 0.618772 6.40039 1.00537 6.40039C1.39197 6.40039 1.70557 6.08679 1.70557 5.7002V0.700195C1.70557 0.313596 1.39197 0 1.00537 0C0.618772 0 0.305176 0.313596 0.305176 0.700195ZM1.11133 7.70508L1.00879 7.7002H1C0.447715 7.7002 0 8.14791 0 8.7002C0 9.25248 0.447715 9.7002 1 9.7002H1.00879L1.11133 9.69531C1.61555 9.64407 2.00879 9.21794 2.00879 8.7002C2.00879 8.18245 1.61555 7.75632 1.11133 7.70508Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'warning-2';
