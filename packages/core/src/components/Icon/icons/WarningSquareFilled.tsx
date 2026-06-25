import { SVGProps } from '@components/Icon/types';

export const WarningSquareFilled = ({
  fill = '#000',
  size = 24,
  tooltip = 'Warning Square Filled',
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
    <g transform="translate(2, 2)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.81 0H14.19C17.83 0 20 2.17 19.99 5.81V14.19C19.99 17.83 17.82 20 14.18 20H5.81C2.17 20 0 17.83 0 14.18V5.81C0 2.17 2.17 0 5.81 0ZM10 5C9.59 5 9.25 5.34 9.25 5.75V10.75C9.25 11.16 9.59 11.5 10 11.5C10.41 11.5 10.75 11.16 10.75 10.75V5.75C10.75 5.34 10.41 5 10 5ZM10.71 14.46C10.8 14.36 10.87 14.26 10.92 14.13C10.97 14.01 11 13.88 11 13.75C11 13.62 10.97 13.49 10.92 13.37C10.87 13.25 10.8 13.14 10.71 13.04C10.61 12.95 10.5 12.88 10.38 12.83C10.14 12.73 9.86 12.73 9.62 12.83C9.5 12.88 9.39 12.95 9.29 13.04C9.2 13.14 9.13 13.25 9.08 13.37C9.03 13.49 9 13.62 9 13.75C9 13.88 9.03 14.01 9.08 14.13C9.13 14.26 9.2 14.36 9.29 14.46C9.39 14.55 9.5 14.62 9.62 14.67C9.74 14.72 9.87 14.75 10 14.75C10.13 14.75 10.26 14.72 10.38 14.67C10.5 14.62 10.61 14.55 10.71 14.46Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'warning-square-filled';
