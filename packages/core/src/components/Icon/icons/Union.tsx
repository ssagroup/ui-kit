import { SVGProps } from '@components/Icon/types';

export const Union = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    fill="none"
    viewBox="0 0 3 10"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>Union</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.50879 2C0.956504 2 0.508789 1.55228 0.508789 1C0.508789 0.447715 0.956504 0 1.50879 0H1.51777C2.07006 0 2.51777 0.447715 2.51777 1C2.51777 1.55228 2.07006 2 1.51777 2H1.50879ZM2.21416 9C2.21416 9.3866 1.90076 9.7 1.51416 9.7C1.12756 9.7 0.81416 9.3866 0.81416 9V4C0.81416 3.6134 1.12756 3.3 1.51416 3.3C1.90076 3.3 2.21416 3.6134 2.21416 4V9Z"
      fill={fill}
    />
  </svg>
);
