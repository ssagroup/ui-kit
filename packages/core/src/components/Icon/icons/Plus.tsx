import { SVGProps } from '@components/Icon/types';

export const Plus = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(3, 3)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00039 18C9.49727 17.9998 9.89981 17.5965 9.89981 17.0996V9.9H17.0996C17.5967 9.9 18 9.49667 18 8.99961C17.9998 8.50273 17.5965 8.10019 17.0996 8.10019H9.89981V0.900391C9.89981 0.403465 9.49727 0.000211056 9.00039 0C8.50333 0 8.1 0.403334 8.1 0.900391V8.10019H0.900391C0.403465 8.10019 0.000211056 8.50273 0 8.99961C0 9.49667 0.403334 9.9 0.900391 9.9H8.1V17.0996C8.1 17.5967 8.50333 18 9.00039 18Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'plus';
