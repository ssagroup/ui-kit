import { SVGProps } from '@components/Icon/types';

export const CheckCircle = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <title>Check circle</title>
    <path
      d="M10.0003 18.3334C14.5837 18.3334 18.3337 14.5834 18.3337 10.0001C18.3337 5.41675 14.5837 1.66675 10.0003 1.66675C5.41699 1.66675 1.66699 5.41675 1.66699 10.0001C1.66699 14.5834 5.41699 18.3334 10.0003 18.3334Z"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.45801 9.99993L8.81634 12.3583L13.5413 7.6416"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
