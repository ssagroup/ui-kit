import { SVGProps } from '@components/Icon/types';

export const CarrotRight = ({
  fill = '#000',
  size = 24,
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(7.6, 20.9) rotate(-90)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.266566 0.268984C0.621987 -0.0896612 1.19824 -0.0896612 1.55366 0.268984L9 7.78287L16.4463 0.268984C16.8018 -0.0896612 17.378 -0.0896612 17.7334 0.268984C18.0889 0.627628 18.0889 1.20911 17.7334 1.56775L9.64355 9.73102C9.28812 10.0897 8.71187 10.0897 8.35645 9.73102L0.266566 1.56775C-0.0888552 1.20911 -0.0888552 0.627628 0.266566 0.268984Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'carrot-right';
