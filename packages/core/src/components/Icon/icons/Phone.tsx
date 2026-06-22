import { SVGProps } from '@components/Icon/types';

export const Phone = ({
  fill = '#000',
  size = 24,
  tooltip = 'Phone',
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
    {/* Phone body */}
    <g transform="translate(5, 2)">
      <path
        d="M10 18.5996V20H4V18.5996H10ZM12.5996 16V4C12.5996 2.56406 11.4359 1.40039 10 1.40039H4C2.56406 1.40039 1.40039 2.56406 1.40039 4V16C1.40039 17.4359 2.56406 18.5996 4 18.5996V20L3.79395 19.9951C1.68056 19.8879 0 18.14 0 16V4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V16C14 18.2091 12.2091 20 10 20V18.5996C11.4359 18.5996 12.5996 17.4359 12.5996 16Z"
        fill={fill}
      />
    </g>
    {/* Speaker line */}
    <g transform="translate(10.3, 4.8)">
      <path
        d="M0.7 0.7H2.7"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  </svg>
);

export const ICON_NAME = 'phone';
