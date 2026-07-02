import { SVGProps } from '@components/Icon/types';

export const AttentionCircle = ({
  fill = '#000',
  size = 24,
  ...props
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3052 7.75024V12.7502C11.3052 13.1368 11.6188 13.4504 12.0054 13.4504C12.392 13.4504 12.7056 13.1368 12.7056 12.7502V7.75024C12.7056 7.36364 12.392 7.05005 12.0054 7.05005C11.6188 7.05005 11.3052 7.36364 11.3052 7.75024ZM13.0088 15.7502C13.0088 15.198 12.5611 14.7502 12.0088 14.7502H12C11.4477 14.7502 11 15.198 11 15.7502C11 16.3025 11.4477 16.7502 12 16.7502H12.0088C12.5611 16.7502 13.0088 16.3025 13.0088 15.7502Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'attention-circle';
