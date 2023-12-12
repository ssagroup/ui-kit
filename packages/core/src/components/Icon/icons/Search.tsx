import { SVGProps } from '@components/Icon/types';

export const Search = ({ fill = '#55575A', size = 24, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    fill="none"
    {...props}>
    <title>Search</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.8292 4.47028C15.1756 6.5284 15.5224 10.0541 13.6219 12.53L18 16.9081L16.9081 18L12.53 13.6219C10.0541 15.5224 6.5284 15.1756 4.47028 12.8292C2.41216 10.4828 2.52792 6.94189 4.73491 4.73491C6.94189 2.52792 10.4828 2.41216 12.8292 4.47028ZM4.5 9C4.5 11.4853 6.51472 13.5 9 13.5C11.4853 13.5 13.5 11.4853 13.5 9C13.5 6.51472 11.4853 4.5 9 4.5C6.51472 4.5 4.5 6.51472 4.5 9Z"
      fill={fill}
    />
  </svg>
);
