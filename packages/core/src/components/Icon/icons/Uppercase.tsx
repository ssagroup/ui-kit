import { SVGProps } from '@components/Icon/types';

export const Uppercase = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(6.1, 5)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 14L4.68611 0H7.09722L11.7833 14H9.98472L8.8787 10.7236H2.89483L1.79861 14H0ZM5.87344 1.82111L3.43806 9.1H8.33061L5.87344 1.82111Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'uppercase';
