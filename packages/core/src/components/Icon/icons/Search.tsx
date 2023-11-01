import { SVGProps } from '@components/Icon/types';

export const Search = ({ fill = '#55575A', size = 24 }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox={`0 0 ${size} ${size}`}
    fill="none">
    <title>Search</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.82917 1.47028C12.1756 3.5284 12.5224 7.05414 10.6219 9.52998L15 13.9081L13.9081 15L9.52998 10.6219C7.05414 12.5224 3.5284 12.1756 1.47028 9.82917C-0.587839 7.48275 -0.472077 3.94189 1.73491 1.73491C3.94189 -0.472077 7.48275 -0.587839 9.82917 1.47028ZM1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6Z"
      fill={fill}
    />
  </svg>
);
