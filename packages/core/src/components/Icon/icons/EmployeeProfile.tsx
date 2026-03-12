import { SVGProps } from '@components/Icon/types';

export const EmployeeProfile = ({
  fill = '#000',
  size = 24,
  tooltip = 'Employee Profile',
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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0ZM6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2h-1.5v-2a2.5 2.5 0 0 0-2.5-2.5h-4A2.5 2.5 0 0 0 7.5 18v2H6ZM16 10h4v11h-4V10Zm-1.5-1.5V22a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'employee-profile';
