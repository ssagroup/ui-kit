import { SVGProps } from '@components/Icon/types';

export const Tablet = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(2, 4)">
      <path
        d="M4 6.2998C4.33841 6.2998 4.62042 6.5402 4.68555 6.85938L4.7002 7V9C4.7002 9.3866 4.3866 9.7002 4 9.7002C3.6134 9.7002 3.2998 9.3866 3.2998 9V7L3.31445 6.85938C3.37958 6.5402 3.66159 6.2998 4 6.2998Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 12C20 14.2091 18.2091 16 16 16H4C1.79086 16 0 14.2091 0 12V4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V12ZM18.5996 4C18.5996 2.56406 17.4359 1.40039 16 1.40039H4C2.56406 1.40039 1.40039 2.56406 1.40039 4V12C1.40039 13.4359 2.56406 14.5996 4 14.5996H16C17.4359 14.5996 18.5996 13.4359 18.5996 12V4Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'tablet';
